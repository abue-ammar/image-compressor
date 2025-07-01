const ImageQualitySlider = ({
  value,
  onImageQualityChange,
}: {
  value: number;
  onImageQualityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const quality = Math.round((value / 100) * 10) / 10;

  const getImageQualityInfo = (q: number) => {
    if (q === 0) return { label: "Not Recommended", color: "#e14f42" };
    if (q === 0.2 || q === 0.4) return { label: "Moderate", color: "#f3d35f" };
    if (q === 0.6 || q === 0.8)
      return { label: "Recommended", color: "#3fc97f" };
    if (q === 1) return { label: "Not Recommended", color: "#e14f42" };
    if (Math.abs(q - 0.6) < 0.05 || Math.abs(q - 0.8) < 0.05)
      return { label: "Recommended", color: "#3fc97f" };
    if (Math.abs(q - 0.2) < 0.05 || Math.abs(q - 0.4) < 0.05)
      return { label: "Moderate", color: "#f3d35f" };
    if (Math.abs(q - 1) < 0.05)
      return { label: "Not Recommended", color: "#e14f42" };
    return { label: "", color: "#000" };
  };

  const { label, color } = getImageQualityInfo(quality);

  return (
    <div className="w-full">
      <label className="block text-xl font-semibold">
        Image Quality: {value}%
        <span style={{ color }} className="ml-1">
          ({label})
        </span>
      </label>
      <p className="text-muted-foreground text-sm">
        Higher quality = larger file size
      </p>
      <div className="relative mb-4">
        <input
          type="range"
          className="range range-sm h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
          value={value}
          min={0}
          max={100}
          step={20}
          onChange={onImageQualityChange}
        />
        <div className="mt-1 flex justify-between text-sm">
          <span className="text-destructive">Low</span>
          <span className="text-warning">Fair</span>
          <span className="text-warning">Okay</span>
          <span className="text-success">Good</span>
          <span className="text-success">High</span>
          <span className="text-destructive">Max</span>
        </div>
      </div>
    </div>
  );
};

export default ImageQualitySlider;
