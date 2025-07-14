import { useState } from "react";
import { filterValidFiles } from "../utils/file-validation";

export const useDragAndDrop = (onFilesDropped: (files: File[]) => void) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

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
      return;
    }

    onFilesDropped(validFiles);
  };

  return {
    isDragActive,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  };
};
