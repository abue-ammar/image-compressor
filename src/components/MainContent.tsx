import Compressor from "compressorjs";
import JSZip from "jszip";
import { Download, ImageIcon, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { PhotoProvider } from "react-photo-view";
import ImageInfoCard from "./ImageInfoCard";
import Intro from "./Intro";
import LoadingSpinner from "./LoadingSpinner";
import QualitySlider from "./QualitySlider";
import { Button } from "./ui/button";

type CompressedImage = {
  fileName: string;
  originalSize: number;
  compressedSize: number;
  fileType: string;
  content: string;
  compressRate: string;
};

const MainContent = () => {
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>(
    []
  );
  const [zipFile, setZipFile] = useState<Blob | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<number>(60); // Initial value
  const [filelist, setFilelist] = useState<FileList | File[]>([]);
  const [compressProgress, setCompressProgress] = useState<number>(0);

  const handleRangeChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(parseInt(event.target.value, 10));
  };

  const handleImageDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    setFilelist(e.dataTransfer.files);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setFilelist(e.target.files);
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
      const compressedDataSize = binaryData.length;
      const rate = ((compressedDataSize - file.size) / file.size) * 100;
      const dotIndex = file?.name?.lastIndexOf(".");
      compressedImgs.push({
        fileName:
          "compressed_" + file?.name?.slice(0, 8) + file?.name?.slice(dotIndex),
        originalSize: file.size,
        compressedSize: compressedDataSize,
        fileType: file.type,
        content: compressedImg as string,
        compressRate: rate.toFixed(2),
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
  };

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
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

  const handleSingleDownload = (file: string) => {
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

  return (
    <div className="container mx-auto px-4">
      <Intro />
      <QualitySlider value={value} handleRangeChange={handleRangeChange} />
      <div className="">
        <label
          className={`border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-40 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-all duration-200 ease-in not-data-[files]:justify-center has-[input:focus]:ring-[3px] ${isDragActive ? "scale-101 border-gray-600 shadow-lg" : ""}`}
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          htmlFor="file-input"
        >
          <input
            multiple
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="file-input"
            className="sr-only"
            aria-label="Upload image file"
          />
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-base font-medium">
              Drop your images here
            </p>
            <p className="text-muted-foreground text-sm">
              JPG, JPEG, PNG, WEBP
            </p>
            <p className="text-destructive text-sm">
              **PNG formatted images need to be larger than 120KB
            </p>
          </div>
        </label>
        <div className="my-4 flex justify-end gap-x-4">
          {compressedImages?.length > 0 && filelist?.length > 0 && (
            <>
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
            </>
          )}
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-2">
            <LoadingSpinner compressProgress={compressProgress} />
          </div>
        ) : (
          <PhotoProvider>
            {compressedImages?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold">Compressed Images</h2>
                <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
                  {compressedImages?.map((image, i) => (
                    <ImageInfoCard
                      key={i}
                      handleSingleDownload={handleSingleDownload}
                      {...image}
                    />
                  ))}
                </div>
              </div>
            )}
          </PhotoProvider>
        )}
      </div>
    </div>
  );
};

export default MainContent;
