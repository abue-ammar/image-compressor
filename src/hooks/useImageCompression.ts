import { useCallback, useEffect, useState } from "react";
import type { CompressedImage } from "../types/image-compressor";
import { filterValidFiles } from "../utils/file-validation";
import { processImages } from "../utils/image-compression";

export const useImageCompression = () => {
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>(
    []
  );
  const [zipFile, setZipFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<number>(60);
  const [filelist, setFilelist] = useState<FileList | File[]>([]);
  const [compressProgress, setCompressProgress] = useState<number>(0);

  const handleImages = useCallback(
    async (files: File[]) => {
      setLoading(true);
      try {
        const { compressedImages: newCompressedImages, zipFile: newZipFile } =
          await processImages(files, value, setCompressProgress);

        setCompressedImages(newCompressedImages);
        setZipFile(newZipFile);
      } catch (error) {
        console.error("Error processing images:", error);
      } finally {
        setLoading(false);
      }
    },
    [value]
  );

  const handleImageUpload = (files: FileList | File[]) => {
    const validFiles = filterValidFiles(files);
    if (validFiles.length === 0) {
      return;
    }
    setCompressedImages([]);
    setCompressProgress(0);
    setFilelist(validFiles);
  };

  const onImageQualityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
  };

  const resetCompression = () => {
    setValue(60);
    setCompressProgress(0);
    setCompressedImages([]);
    setFilelist([]);
  };

  useEffect(() => {
    const filesArr = Array.from(filelist as FileList | File[]);
    if (filesArr.length > 0) {
      handleImages(filesArr);
    }
  }, [value, filelist, handleImages]);

  return {
    compressedImages,
    zipFile,
    loading,
    value,
    filelist,
    compressProgress,
    handleImageUpload,
    onImageQualityChange,
    resetCompression,
  };
};
