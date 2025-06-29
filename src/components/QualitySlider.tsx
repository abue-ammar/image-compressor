const QualitySlider = ({
  value,
  handleRangeChange,
}: {
  value: number;
  handleRangeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const quality = Math.round(value / 20) * 0.2;

  const getQualityInfo = (q: number) => {
    if (q === 0) return { label: "Not Recommended", color: "#ff4d4f" };
    if (q === 0.2 || q === 0.4) return { label: "Moderate", color: "#fadb14" };
    if (q === 0.6 || q === 0.8)
      return { label: "Recommended", color: "#0fdd23" };
    if (q === 1) return { label: "Not Recommended", color: "#ff4d4f" };
    return { label: "", color: "#000" };
  };

  const { label, color } = getQualityInfo(quality);

  return (
    <div className="w-full">
      <label className="block font-medium md:text-lg md:font-semibold">
        Image Quality: {(value / 100).toFixed(1)}{" "}
        <span style={{ color }} className="ml-1">
          ({label})
        </span>
      </label>
      <p className="text-muted-foreground text-sm">
        Higher quality = larger file size
      </p>
      <div className="relative mb-6">
        <input
          type="range"
          className="range range-sm h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
          value={value}
          min={0}
          max={100}
          step={20}
          onChange={handleRangeChange}
        />
        {/* Labels under slider */}
        <div className="mt-1 flex justify-between text-sm">
          <span className="text-[#ff4d4f]">Low</span>
          <span className="text-[#fadb14]">Fair</span>
          <span className="text-[#fadb14]">Okay</span>
          <span className="text-[#0fdd23]">Good</span>
          <span className="text-[#0fdd23]">High</span>
          <span className="text-[#ff4d4f]">Max</span>
        </div>
      </div>
    </div>
  );
};

export default QualitySlider;
