import Compressor from "compressorjs";
import JSZip from "jszip";
import React, { useEffect, useState } from "react";
import { PhotoProvider } from "react-photo-view";
import ImageInfoCard from "./ImageInfoCard";
import Intro from "./Intro";
import LoadingSpinner from "./LoadingSpinner";
import ProgressBar from "./ProgressBar";
import QualitySlider from "./QualitySlider";

const MainContent = () => {
  const [compressedImages, setCompressedImages] = useState([]);
  const [zipFile, setZipFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(60); // Initial value
  const [filelist, setFilelist] = useState([]);
  const [compressProgress, setCompressProgress] = useState(0);

  const handleRangeChange = async (event) => {
    setValue(parseInt(event.target.value, 10));
  };

  const handleImageDrop = async (e) => {
    e.preventDefault();
    setIsDragActive(false);
    setFilelist(e.dataTransfer.files);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setFilelist(e.target.files);
  };

  useEffect(() => {
    if (filelist.length > 0) {
      handleImages(filelist);
    }
  }, [value, filelist]);

  const handleImages = async (files) => {
    setLoading(true);
    const compressedImgs = [];
    const zip = new JSZip();
    const img = zip.folder("compressed_images");
    let counter = files?.length;
    for (const file of files) {
      const compressedImg = await compressImage(file);
      //   compressedImgs.push(compressedImg);
      const base64Data = compressedImg.split(",")[1];
      const binaryData = atob(base64Data);
      // Get the length of the binary data
      const compressedDataSize = binaryData.length;
      const rate = ((file?.size - compressedDataSize) / file.size) * 100;
      let dotIndex = file?.name?.lastIndexOf(".");
      compressedImgs.push({
        fileName:
          "compressed_" + file?.name?.slice(0, 8) + file?.name?.slice(dotIndex),
        originalSize: file.size,
        compressedSize: compressedDataSize,
        fileType: file.type,
        content: compressedImg,
        compressRate: rate.toFixed(2),
      });
      const response = await fetch(compressedImg);
      const blob = await response.blob();
      img.file(`compressed_${file?.name}`, blob);
      counter = counter - 1;
      const progress = Math.floor(
        ((files?.length - counter) / files?.length) * 100
      );
      setCompressProgress(progress);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    setZipFile(zipBlob);
    setCompressedImages(compressedImgs);
    setLoading(false);
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        maxWidth: undefined,
        maxHeight: undefined,
        minWidth: 0,
        minHeight: 0,
        width: undefined,
        height: undefined,
        quality: value / 100,
        convertSize: 120000,
        convertTypes: ["image/png"],
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onload = () => {
            resolve(reader.result);
          };
        },
        error(err) {
          reject(err);
        },
      });
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDownload = () => {
    if (zipFile) {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(zipFile);
      downloadLink.download = "compressed_images.zip";
      downloadLink.click();
    }
  };

  const handleSingleDownload = (file) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = file;
    var regexResult = /^data:(.+?)(?:;(?:.+?))?,/.exec(file);
    var contentType = regexResult[1];
    var extension = contentType.split("/")[1];
    downloadLink.download = `compressed_image.${extension}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="container mx-auto px-4">
      <Intro />
      <QualitySlider
        value={value}
        handleRangeChange={handleRangeChange}
        setValue={setValue}
      />
      <div className="">
        <label
          className={`flex justify-center items-center cursor-pointer h-30 md:40 border-2 border-dashed rounded-lg
        ${isDragActive ? "bg-gray-100 border-gray-700" : "border-gray-300"}`}
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          htmlFor="file-input"
        >
          {/* Your drop area content */}
          <div className="flex flex-col items-center justify-center py-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-9 h-9 md:mb-2 ${
                isDragActive ? "text-gray-700" : "text-gray-500"
              } `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <p
              className={`md:text-lg  ${
                isDragActive ? "text-gray-700" : "text-gray-500"
              } `}
            >
              <span className="font-semibold">Click to upload</span> or drag and
              drop multiple images
            </p>
            <p className="text-gray-500">jpg, jpeg, png, webp</p>
            <p className="text-[#ff4d4f] text-sm">
              **png formatted image need to be larger than 120kb
            </p>
          </div>

          <input
            multiple
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="file-input"
          />
        </label>
        <div className="mt-4 flex justify-end">
          {compressedImages?.length > 0 && (
            <div className="mr-2">
              <button
                className="inline-flex items-center px-3 py-1 bg-black hover:bg-black/80 text-white text-sm font-medium rounded-md"
                onClick={handleDownload}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mr-1 size-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span className="mt-1">Download All Images (ZIP)</span>
              </button>
            </div>
          )}
          {filelist?.length > 0 && (
            <button
              className="inline-flex items-center px-3 py-1 bg-[#ff4d4f] hover:bg-[#ff4d4f]/85 text-white text-sm font-medium rounded-md"
              onClick={() => {
                setValue(60);
                setCompressProgress(0);
                setCompressedImages([]);
                setFilelist([]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="mr-1 size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>

              <span className="mt-1">Reset</span>
            </button>
          )}
        </div>
        {compressProgress > 0 && (
          <div className="pt-2">
            <ProgressBar width={compressProgress} />
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-2">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <PhotoProvider>
              {compressedImages?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                  {compressedImages?.map((image, i) => (
                    <ImageInfoCard
                      key={i}
                      handleSingleDownload={handleSingleDownload}
                      {...image}
                    />
                  ))}
                </div>
              )}
            </PhotoProvider>
          </>
        )}
      </div>
    </div>
  );
};

export default MainContent;
