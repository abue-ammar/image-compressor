import { filterValidFiles } from "@/lib/file-validation";
import { ImageIcon } from "lucide-react";
import { useRef } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  hasCompressedImages: boolean;
  ref?: React.RefObject<HTMLParagraphElement | null>;
}

const DropZone = ({
  onFilesSelected,
  hasCompressedImages,
  ref,
}: DropZoneProps) => {
  const dropAreaRef = useRef<HTMLLabelElement>(null);

  const {
    isDragActive,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  } = useDragAndDrop(onFilesSelected);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const validFiles = filterValidFiles(e.target.files);
      if (validFiles.length === 0) {
        return;
      }
      onFilesSelected(validFiles);
    }
  };

  return (
    <label
      ref={dropAreaRef}
      className={`relative flex flex-col items-center overflow-hidden rounded-xl border-2 border-dashed p-2 transition-all duration-200 ease-in-out ${
        isDragActive
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-300 dark:border-gray-600"
      } ${hasCompressedImages ? "" : "justify-center"}`}
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
          {isDragActive ? "Drop your images here" : "Drag & drop images here"}
        </p>
        <p className="text-muted-foreground text-sm">JPG, JPEG, PNG, WEBP</p>
        <p className="text-destructive text-xs" ref={ref}>
          **PNG formatted images need to be larger than 120KB
        </p>
      </div>
    </label>
  );
};

export default DropZone;
