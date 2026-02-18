import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";
import { toast } from "sonner";
import { isTauri } from "./platform";

export const downloadZip = async (zipFile: Blob | null) => {
  if (!zipFile) {
    toast.error("No zip file available.");
    return;
  }

  try {
    if (isTauri()) {
      const filePath = await save({
        defaultPath: "compressed_images.zip",
        filters: [{ name: "ZIP", extensions: ["zip"] }],
      });

      if (filePath) {
        const arrayBuffer = await zipFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        await writeFile(filePath, uint8Array);
        toast.success("ZIP saved successfully!");
      } else {
        toast.error("Download canceled.");
      }
    } else {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(zipFile);
      downloadLink.download = "compressed_images.zip";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success("ZIP downloaded successfully!");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to download ZIP.");
  }
};

export const downloadSingleImage = async (file: string, fileName?: string) => {
  try {
    const regexResult = /^data:(.+?)(?:;(?:.+?))?,/.exec(file);
    let extension = "jpg";
    if (regexResult && regexResult[1]) {
      const contentType = regexResult[1];
      extension = contentType.split("/")[1] || "jpg";
    }

    const defaultFileName = fileName || `compressed_image.${extension}`;

    if (isTauri()) {
      const filePath = await save({
        defaultPath: defaultFileName,
        filters: [{ name: "Images", extensions: [extension] }],
      });

      if (filePath) {
        const base64Data = file.split(",")[1];
        const binaryString = atob(base64Data);
        const uint8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          uint8Array[i] = binaryString.charCodeAt(i);
        }
        await writeFile(filePath, uint8Array);
        toast.success("Image saved successfully!");
      } else {
        toast.error("Download canceled.");
      }
    } else {
      const downloadLink = document.createElement("a");
      downloadLink.href = file;
      downloadLink.download = defaultFileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success("Image downloaded successfully!");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to download image.");
  }
};
