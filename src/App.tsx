import { useEffect, useRef } from "react";
import ActionButtons from "./components/action-buttons";
import CompressedImagesGrid from "./components/compressed-images-grid";
import DropZone from "./components/drop-zone";
import Footer from "./components/footer";
import Header from "./components/header";
import ImageQualitySlider from "./components/image-quality-slider";
import Intro from "./components/intro";
import LoadingSpinner from "./components/loading-spinner";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { useImageCompression } from "./hooks/useImageCompression";

function App() {
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

  const imageResultRef = useRef<HTMLDivElement>(null);

  // Add scroll effect when compressed images are available
  useEffect(() => {
    if (compressedImages.length > 0 && imageResultRef.current) {
      setTimeout(() => {
        imageResultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 300);
    }
  }, [compressedImages.length]);
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container mx-auto flex-1 px-4">
          <Intro />
          <ImageQualitySlider
            value={value}
            onImageQualityChange={onImageQualityChange}
          />

          <div
            className="animate-fadeIn animate-delay-200"
            ref={imageResultRef}
          >
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
              <CompressedImagesGrid compressedImages={compressedImages} />
            )}
          </div>
          <Footer />
          <Toaster />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
