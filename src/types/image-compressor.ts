export interface CompressedImage {
  fileName: string;
  originalImageSize: number;
  compressedImageSize: number;
  fileType: string;
  content: string;
  compressionPercentage: string;
}

export interface ImageCompressorState {
  compressedImages: CompressedImage[];
  zipFile: Blob | null;
  isDragActive: boolean;
  loading: boolean;
  value: number;
  filelist: FileList | File[];
  compressProgress: number;
}
