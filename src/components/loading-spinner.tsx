import { LoaderCircle } from "lucide-react";

const LoadingSpinner = ({ compressProgress }: { compressProgress: number }) => {
  return (
    <div className="text-muted-foreground flex items-center gap-x-2">
      <LoaderCircle className="size-8 animate-spin" />
      <span className="text-muted-foreground animate-pulse text-lg font-medium">
        {compressProgress === 100
          ? `Compressed ${compressProgress}%`
          : `Compressing... ${compressProgress}%`}
      </span>
    </div>
  );
};

export default LoadingSpinner;
