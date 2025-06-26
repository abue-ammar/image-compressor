import { PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { formatFileSize } from "../utils/utils";

const ImageInfoCard = ({ handleSingleDownload, ...props }) => {
  return (
    <div className="flex overflow-hidden rounded-lg bg-white shadow hover:shadow-md">
      <div className="relative inline-block cursor-pointer">
        <PhotoView src={props?.content}>
          <div>
            <img
              src={props?.content}
              alt={props?.fileName}
              className="size-[100px] rounded-lg object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6 text-[#fafafa]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
          </div>
        </PhotoView>
      </div>

      <div className="flex-1 px-2 py-1">
        <h1 className="line-clamp-1 text-base font-semibold md:text-lg">
          {props?.fileName}
        </h1>
        <span className="flex items-center text-xs text-gray-500 md:text-sm">
          <span className="text-[#ff4d4f]">
            {formatFileSize(props?.originalSize)}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mb-[3px] h-4 w-[18px] text-black"
          >
            <path
              fillRule="evenodd"
              d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="text-[#0fdd23]">
            {formatFileSize(props?.compressedSize)}{" "}
            <span className="inline-flex">({props?.compressRate}%)</span>
          </span>
        </span>
        <button
          onClick={() => handleSingleDownload(props?.content)}
          className="mt-2 inline-flex items-center rounded-md bg-[#0ecd0f] px-2 text-white hover:bg-[#0ecd0f]/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="mr-1 size-[14px]"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span className="mt-1 text-sm">Download</span>
        </button>
      </div>
    </div>
  );
};

export default ImageInfoCard;
