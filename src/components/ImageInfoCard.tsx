import { formatFileSize } from "@/utils/utils";
import { DownloadIcon, Eye } from "lucide-react";
import { PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Button } from "./ui/button";

const ImageInfoCard = ({
  handleSingleDownload,
  ...props
}: {
  handleSingleDownload: (file: string) => void;
  content: string;
  fileName: string;
  originalSize: number;
  compressedSize: number;
  compressRate: string;
}) => {
  return (
    <div className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="bg-accent relative aspect-square shrink-0 cursor-pointer rounded-[6px]">
          <PhotoView src={props?.content}>
            <div>
              <img
                src={props?.content}
                alt={props?.fileName}
                className="size-12 rounded-[6px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-[6px] bg-black/25">
                <Eye className="text-[#fafafa]" />
              </div>
            </div>
          </PhotoView>
        </div>
        <div className="flex min-w-0 flex-col">
          <p className="truncate text-sm font-medium">{props?.fileName}</p>
          <span className="text-muted-foreground flex items-center text-xs">
            <span className="text-destructive">
              {formatFileSize(props?.originalSize)}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-[18px] text-black"
            >
              <path
                fillRule="evenodd"
                d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="text-success">
              {formatFileSize(props?.compressedSize)}{" "}
              <span className="inline-flex">({props?.compressRate}%)</span>
            </span>
          </span>
        </div>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
        onClick={() => handleSingleDownload(props?.content)}
      >
        <DownloadIcon aria-hidden="true" />
      </Button>
    </div>
  );
};

export default ImageInfoCard;
