import { toast } from "sonner";

// Allowed image formats
export const ALLOWED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Validate file type
export const validateFileType = (file: File): boolean => {
  return ALLOWED_FORMATS.includes(file.type.toLowerCase());
};

// Filter valid files and show error for invalid ones
export const filterValidFiles = (files: FileList | File[]): File[] => {
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
