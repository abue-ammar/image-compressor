import { useEffect, useRef } from "react";
import { useImageCompression } from "../hooks/useImageCompression";
import ActionButtons from "./action-buttons";
import CompressedImagesGrid from "./compressed-images-grid";
import DropZone from "./drop-zone";
import ImageQualitySlider from "./image-quality-slider";
import Intro from "./intro";
import LoadingSpinner from "./loading-spinner";

const ImageCompressor = () => {
  const {
    compressedImages,
    zipFile,
    loading,
    value,
    filelist,
    compressProgress,
    handleImageUpload,
    onImageQualityChange,
    resetCompression,
  } = useImageCompression();

  const compressedImagesRef = useRef<HTMLDivElement>(null);

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
      <div className="animate-fadeIn animate-delay-150">
        <ImageQualitySlider
          value={value}
          onImageQualityChange={onImageQualityChange}
        />
      </div>
      <div className="animate-fadeIn animate-delay-200">
        <DropZone
          onFilesSelected={handleImageUpload}
          hasCompressedImages={compressedImages.length > 0}
        />

        <ActionButtons
          zipFile={zipFile}
          onReset={resetCompression}
          hasCompressedImages={compressedImages.length > 0}
          hasFileList={filelist.length > 0}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <LoadingSpinner compressProgress={compressProgress} />
          </div>
        ) : (
          <div ref={compressedImagesRef}>
            <CompressedImagesGrid compressedImages={compressedImages} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCompressor;
