import Compressor from "compressorjs";
import JSZip from "jszip";
import type { CompressedImage } from "../types/image-compressor";

export const compressImage = (file: File, quality: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      maxWidth: undefined,
      maxHeight: undefined,
      minWidth: 0,
      minHeight: 0,
      width: undefined,
      height: undefined,
      quality: quality / 100,
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

export const processImages = async (
  files: File[],
  quality: number,
  onProgress: (progress: number) => void
): Promise<{ compressedImages: CompressedImage[]; zipFile: Blob }> => {
  const compressedImgs: CompressedImage[] = [];
  const zip = new JSZip();
  const img = zip.folder("compressed_images");
  let counter = files.length;

  for (const file of files) {
    const compressedImg = await compressImage(file, quality);
    const base64Data = (compressedImg as string).split(",")[1];
    const binaryData = atob(base64Data);
    const compressedImageSize = binaryData.length;
    const rate = ((compressedImageSize - file.size) / file.size) * 100;
    const dotIndex = file.name.lastIndexOf(".");

    compressedImgs.push({
      fileName:
        "compressed_" + file.name.slice(0, 8) + file.name.slice(dotIndex),
      originalImageSize: file.size,
      compressedImageSize: compressedImageSize,
      fileType: file.type,
      content: compressedImg as string,
      compressionPercentage: rate.toFixed(2),
    });

    const response = await fetch(compressedImg as string);
    const blob = await response.blob();
    img?.file(`compressed_${file.name}`, blob);
    counter = counter - 1;

    const progress = Math.floor(
      ((files.length - counter) / files.length) * 100
    );
    onProgress(progress);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });

  return {
    compressedImages: compressedImgs,
    zipFile: zipBlob,
  };
};
