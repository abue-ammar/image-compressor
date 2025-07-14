import { Inbox } from "lucide-react";
import { PhotoProvider } from "react-photo-view";
import type { CompressedImage } from "../types/image-compressor";
import { downloadSingleImage } from "../utils/download";
import ImagePreviewCard from "./image-preview-card";

interface CompressedImagesGridProps {
  compressedImages: CompressedImage[];
}

const CompressedImagesGrid = ({
  compressedImages,
}: CompressedImagesGridProps) => {
  if (compressedImages.length === 0) {
    return (
      <div className="text-muted-foreground animate-fadeIn flex flex-col items-center justify-center py-6 text-center md:py-10">
        <Inbox className="size-14" strokeWidth={1.5} />
        <h3 className="mb-1 text-base font-medium">No Compressed Images</h3>
        <p className="max-w-xs text-sm">
          Upload images and compress them to see your results here. Your
          compressed images will appear in this section.
        </p>
      </div>
    );
  }

  return (
    <PhotoProvider>
      <div className="grid grid-cols-1 gap-4 py-4 will-change-transform md:grid-cols-2 lg:grid-cols-3">
        {compressedImages.map((image, i) => (
          <div
            key={`${image.fileName}-${i}`}
            className="animate-fadeInFast"
            style={{ animationDelay: `${Math.min(i * 50, 300)}ms` }}
          >
            <ImagePreviewCard
              onSingleFileDownload={downloadSingleImage}
              {...image}
            />
          </div>
        ))}
      </div>
    </PhotoProvider>
  );
};

export default CompressedImagesGrid;
