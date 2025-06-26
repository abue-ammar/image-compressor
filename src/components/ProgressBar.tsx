const ProgressBar = ({ width }: { width: number }) => {
  return (
    <>
      <span className="text-xs">{width}%</span>
      <div className="-mt-1 h-1 w-full rounded-full bg-gray-200">
        <div
          className="h-1 rounded-full bg-black text-xs"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
