import React, { useState } from "react";
import {errorMessage} from "../../../utility/notification/useNotification";
import { MdOutlineClear } from 'react-icons/md';
function PhotoUpload({ photo, setPhoto }) {
  const [photoSize, setPhotoSize] = useState(0);
  const extention = photo?.name?.split(".").pop();
  if (photo?.size) {
    const img = new Image();
    img.src = window.URL.createObjectURL(photo);
    img.onload = () => {
      if (img.width === 270 && img.height === 270) {
        if (extention === "png") {
          const kb = photo?.size / 1024;
          if (kb < 400) {
            setPhotoSize(kb);
          } else {
            setPhoto("");
            errorMessage("Please image size 500kb");
          }
        } else {
          setPhoto("");
          errorMessage("Please upload image png formate");
        }
      } else {
        setPhoto("");
        errorMessage("Please upload images regulation 300x300 px");
      }
    };
  }
  const photoRemove = () => {
    setPhoto("");
    setPhotoSize(0);
  };
  return (
    <div className="mb-5 md:mb-2 lg:mb-2">
      {photoSize > 20 && photo ? (
        <div className="relative">
          <img
            className="w-full h-44"
            src={URL.createObjectURL(photo)}
          />
          <MdOutlineClear
            title="Close"
            className="absolute top-3 right-3 cursor-pointer bg-font-primary text-xl rounded-md"
            onClick={photoRemove}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full">
          <label
            htmlFor="personal-photo"
            className="flex flex-col justify-center items-center w-full h-44 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  Click to upload your photo
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG (MAX 400KB and 270x270px)
              </p>
            </div>
            <input
              id="personal-photo"
              type="file"
              accept=".png"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default PhotoUpload;
