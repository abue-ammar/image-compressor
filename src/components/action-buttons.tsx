import { Download, RefreshCcw } from "lucide-react";
import { downloadZip } from "@/lib/download";
import { Button } from "./ui/button";

interface ActionButtonsProps {
  zipFile: Blob | null;
  onReset: () => void;
  hasCompressedImages: boolean;
  hasFileList: boolean;
}

const ActionButtons = ({
  zipFile,
  onReset,
  hasCompressedImages,
  hasFileList,
}: ActionButtonsProps) => {
  if (!hasCompressedImages || !hasFileList) {
    return null;
  }

  return (
    <div className="animate-fadeInFast mt-4 flex justify-end gap-x-4">
      <Button variant="default" onClick={() => downloadZip(zipFile)}>
        <Download />
        Download All (ZIP)
      </Button>
      <Button variant="destructive" onClick={onReset}>
        <RefreshCcw />
        Reset
      </Button>
    </div>
  );
};

export default ActionButtons;
