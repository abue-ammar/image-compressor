import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatBytes = (bytes: number) => {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;
  const terabyte = gigabyte * 1024;

  if (bytes < kilobyte) {
    return bytes + " B";
  } else if (bytes < megabyte) {
    return (bytes / kilobyte).toFixed(2) + " KB";
  } else if (bytes < gigabyte) {
    return (bytes / megabyte).toFixed(2) + " MB";
  } else if (bytes < terabyte) {
    return (bytes / gigabyte).toFixed(2) + " GB";
  } else {
    return (bytes / terabyte).toFixed(2) + " TB";
  }
};
