const QualitySlider = ({
  value,
  handleRangeChange,
}: {
  value: number;
  handleRangeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <label className="font-medium md:text-lg md:font-semibold">
        Image Quality: {value / 100}{" "}
        {value / 100 == 0 ? (
          <span className="text-[#ff4d4f]">(Not Recommended)</span>
        ) : value / 100 == 0.2 || value / 100 == 0.4 ? (
          <span className="text-[#fadb14]">(Modarate)</span>
        ) : value / 100 == 0.6 || value / 100 == 0.8 ? (
          <span className="text-[#0fdd23]">(Recommended)</span>
        ) : (
          <span className="text-[#ff4d4f]">(Not Recommended)</span>
        )}
      </label>
      <div className="relative -mt-1.5 mb-6">
        <input
          type="range"
          className="range range-sm h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
          value={value}
          min={0}
          max={100}
          step={20}
          onChange={handleRangeChange}
        />
        <span className="absolute start-0 -bottom-5 text-sm text-[#ff4d4f]">
          0
        </span>
        <span className="absolute start-[20%] -bottom-5 -translate-x-1/2 text-sm text-[#fadb14]">
          0.2
        </span>
        <span className="absolute start-[40.0%] -bottom-5 -translate-x-1/2 text-sm text-[#fadb14]">
          0.4
        </span>
        <span className="absolute start-[60%] -bottom-5 -translate-x-1/2 text-sm text-[#0fdd23]">
          0.6
        </span>
        <span className="absolute start-[80%] -bottom-5 -translate-x-1/2 text-sm text-[#0fdd23]">
          0.8
        </span>
        <span className="absolute end-0 -bottom-5 text-sm text-[#ff4d4f]">
          1
        </span>
      </div>
    </div>
  );
};

export default QualitySlider;
