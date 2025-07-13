import Compressor from "compressorjs";
import JSZip from "jszip";
import { Download, ImageIcon, Inbox, RefreshCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PhotoProvider } from "react-photo-view";
import { toast } from "sonner";

import ImagePreviewCard from "./image-preview-card";
import ImageQualitySlider from "./image-quality-slider";
import Intro from "./intro";
import LoadingSpinner from "./loading-spinner";
import { Button } from "./ui/button";

interface CompressedImage {
  fileName: string;
  originalImageSize: number;
  compressedImageSize: number;
  fileType: string;
  content: string;
  compressionPercentage: string;
}

const ImageCompressor = () => {
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>(
    []
  );
  const [zipFile, setZipFile] = useState<Blob | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<number>(60); // Initial value
  const [filelist, setFilelist] = useState<FileList | File[]>([]);
  const [compressProgress, setCompressProgress] = useState<number>(0);
  const dropAreaRef = useRef<HTMLLabelElement>(null);
  const compressedImagesRef = useRef<HTMLDivElement>(null);

  // Allowed image formats
  const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  // Validate file type
  const validateFileType = (file: File): boolean => {
    return allowedFormats.includes(file.type.toLowerCase());
  };

  // Filter valid files and show error for invalid ones
  const filterValidFiles = (files: FileList | File[]): File[] => {
    const filesArray = Array.from(files);
    const validFiles: File[] = [];
    const invalidFiles: File[] = [];

    filesArray.forEach((file) => {
      if (validateFileType(file)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    });

    // Show error toast for invalid files
    if (invalidFiles.length > 0) {
      const invalidFileNames = invalidFiles.map((file) => file.name).join(", ");
      toast.error(
        `Invalid file! Please upload only JPG, JPEG, PNG, or WEBP files.`,
        {
          description: invalidFileNames,
          duration: 5000,
          position: "top-right",
        }
      );
    }

    return validFiles;
  };

  const onImageQualityChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(parseInt(event.target.value, 10));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const validFiles = filterValidFiles(e.target.files);
      if (validFiles.length === 0) {
        return; // No valid files to process
      }
      setCompressedImages([]);
      setCompressProgress(0);
      setFilelist(validFiles);
    }
  };

  useEffect(() => {
    const filesArr = Array.from(filelist as FileList | File[]);
    if (filesArr.length > 0) {
      handleImages(filesArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, filelist]);

  const handleImages = async (files: File[]) => {
    setLoading(true);
    const compressedImgs: CompressedImage[] = [];
    const zip = new JSZip();
    const img = zip.folder("compressed_images");
    let counter = files?.length;
    for (const file of files) {
      const compressedImg = await compressImage(file);
      const base64Data = (compressedImg as string).split(",")[1];
      const binaryData = atob(base64Data);
      const compressedImageSize = binaryData.length;
      const rate = ((compressedImageSize - file.size) / file.size) * 100;
      const dotIndex = file?.name?.lastIndexOf(".");
      compressedImgs.push({
        fileName:
          "compressed_" + file?.name?.slice(0, 8) + file?.name?.slice(dotIndex),
        originalImageSize: file.size,
        compressedImageSize: compressedImageSize,
        fileType: file.type,
        content: compressedImg as string,
        compressionPercentage: rate.toFixed(2),
      });
      const response = await fetch(compressedImg as string);
      const blob = await response.blob();
      img?.file(`compressed_${file?.name}`, blob);
      counter = counter - 1;
      const progress = Math.floor(
        ((files?.length - counter) / files?.length) * 100
      );
      setCompressProgress(progress);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    setZipFile(zipBlob);
    setCompressedImages(compressedImgs);
    setLoading(false);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        maxWidth: undefined,
        maxHeight: undefined,
        minWidth: 0,
        minHeight: 0,
        width: undefined,
        height: undefined,
        quality: value / 100,
        convertSize: 120000,
        convertTypes: ["image/png"],
        success(result: Blob) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onload = () => {
            resolve(reader.result as string);
          };
        },
        error(err: Error) {
          reject(err);
        },
      });
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragActive) setIsDragActive(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if we're leaving the drop area entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const validFiles = filterValidFiles(e.dataTransfer.files);
    if (validFiles.length === 0) {
      return; // No valid files to process
    }

    setCompressedImages([]);
    setCompressProgress(0);
    setFilelist(validFiles);
  };

  const handleDownload = () => {
    if (zipFile) {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(zipFile);
      downloadLink.download = "compressed_images.zip";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const onSingleFileDownload = (file: string) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = file;
    const regexResult = /^data:(.+?)(?:;(?:.+?))?,/.exec(file);
    let extension = "jpg";
    if (regexResult && regexResult[1]) {
      const contentType = regexResult[1];
      extension = contentType.split("/")[1] || "jpg";
    }
    downloadLink.download = `compressed_image.${extension}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Add scroll effect when compressed images are available
  useEffect(() => {
    if (compressedImages.length > 0 && compressedImagesRef.current) {
      setTimeout(() => {
        compressedImagesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 300);
    }
  }, [compressedImages.length]);

  return (
    <div className="container mx-auto px-4">
      <Intro />
      <ImageQualitySlider
        value={value}
        onImageQualityChange={onImageQualityChange}
      />
      <div className="">
        <label
          ref={dropAreaRef}
          className={`relative flex flex-col items-center overflow-hidden rounded-xl border-2 border-dashed p-2 transition-all duration-200 ease-in-out ${
            isDragActive
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-gray-600"
          } ${compressedImages.length === 0 ? "justify-center" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          htmlFor="file-input"
        >
          <input
            multiple
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="file-input"
            className="sr-only"
            aria-label="Upload image file"
          />
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div className="mb-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-white dark:bg-gray-800">
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1 text-base font-medium">
              {isDragActive
                ? "Drop your images here"
                : "Drag & drop images here"}
            </p>
            <p className="text-muted-foreground text-sm">
              JPG, JPEG, PNG, WEBP
            </p>
            <p className="text-destructive text-xs">
              **PNG formatted images need to be larger than 120KB
            </p>
          </div>
        </label>

        {compressedImages?.length > 0 && filelist?.length > 0 && (
          <div className="mt-4 flex justify-end gap-x-4">
            <Button variant={"default"} onClick={handleDownload}>
              <Download />
              Download All (ZIP)
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => {
                setValue(60);
                setCompressProgress(0);
                setCompressedImages([]);
                setFilelist([]);
              }}
            >
              <RefreshCcw />
              Reset
            </Button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <LoadingSpinner compressProgress={compressProgress} />
          </div>
        ) : (
          <div ref={compressedImagesRef}>
            {/* <h2 className="text-lg font-bold">Compressed Images</h2> */}
            {compressedImages?.length > 0 ? (
              <PhotoProvider>
                <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
                  {compressedImages.map((image, i) => (
                    <ImagePreviewCard
                      key={i}
                      onSingleFileDownload={onSingleFileDownload}
                      {...image}
                    />
                  ))}
                </div>
              </PhotoProvider>
            ) : (
              <div className="text-muted-foreground flex flex-col items-center justify-center py-8 text-center">
                <Inbox className="size-14" strokeWidth={1.5} />
                <h3 className="mb-1 text-base font-medium">
                  No Compressed Images
                </h3>
                <p className="max-w-xs text-sm">
                  Upload images and compress them to see your results here. Your
                  compressed images will appear in this section.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCompressor;
