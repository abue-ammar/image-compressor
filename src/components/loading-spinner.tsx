const LoadingSpinner = ({ compressProgress }: { compressProgress: number }) => {
  return (
    <div className="flex items-center gap-2.5 px-6 py-3">
      <div className="relative h-5 w-5 flex-shrink-0">
        <div className="border-muted-foreground/20 h-5 w-5 rounded-full border-2"></div>
        <div className="border-t-primary absolute inset-0 h-5 w-5 animate-spin rounded-full border-2 border-transparent"></div>
      </div>
      <span className="text-muted-foreground text-base">
        {compressProgress === 100
          ? "Compression complete"
          : `Compressing... ${compressProgress}%`}
      </span>
    </div>
  );
};

export default LoadingSpinner;
