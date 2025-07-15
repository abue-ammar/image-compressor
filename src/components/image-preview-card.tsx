import { formatBytes } from "@/lib/utils";
import { DownloadIcon, Eye, MoveRight } from "lucide-react";
import { memo } from "react";
import { PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Button } from "./ui/button";

const ImagePreviewCard = memo(
  ({
    onSingleFileDownload,
    ...props
  }: {
    onSingleFileDownload: (file: string) => void;
    content: string;
    fileName: string;
    originalImageSize: number;
    compressedImageSize: number;
    compressionPercentage: string;
  }) => {
    return (
      <div className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3 will-change-transform">
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
                {formatBytes(props?.originalImageSize)}
              </span>
              <MoveRight className="mx-1 h-4 w-4" />
              <span className="text-success">
                {formatBytes(props?.compressedImageSize)}{" "}
                <span className="inline-flex">
                  ({props?.compressionPercentage}%)
                </span>
              </span>
            </span>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
          onClick={() => onSingleFileDownload(props?.content)}
        >
          <DownloadIcon aria-hidden="true" />
        </Button>
      </div>
    );
  }
);

export default ImagePreviewCard;
