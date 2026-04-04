import React, { useState, useRef } from "react";

export const StaffAddItemPage = () => {
  const [image, setImage] = useState(null); // Stores the uploaded image (as URL)
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection (from click or drop)
  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    } else {
      alert("Please upload an image file");
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  // Click on box → open file dialog
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Hidden file input
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  // Remove uploaded image
  const removeImage = () => {
    if (image) URL.revokeObjectURL(image);
    setImage(null);
  };

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <form className="flex flex-col gap-6 w-full max-w-2xl">
          {/* Image Upload Area */}
          <div className="flex flex-col items-center">
            <label className="text-lg font-medium mb-2 self-start">
              Item Image (Optional)
            </label>

            <div
              onClick={handleClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full max-w-md h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200
                ${
                  isDragging
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
            >
              {image ? (
                <div className="relative w-full h-full">
                  <img
                    src={image}
                    alt="Uploaded item"
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-6xl mb-4 text-gray-400">📸</div>
                  <p className="text-gray-600 text-center px-6">
                    Drag & drop image here
                    <br />
                    or{" "}
                    <span className="text-teal-600 font-medium">
                      click to upload
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                </>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>

          {/* Rest of your form fields */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Category:</label>
            <select className="border p-2 w-64 cursor-pointer">
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Sports</option>
              <option>Books</option>
              <option>Bags</option>
              <option>Identification</option>
              <option>Personal</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Item Type:</label>
            <input className="border p-2 w-64 cursor-pointer" type="text" />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Brand:</label>
            <input className="border p-2 w-64 cursor-pointer" type="text" />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Material:</label>
            <select className="border p-2 w-64 cursor-pointer">
              <option>Metal</option>
              <option>Plastic</option>
              <option>Fabric</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Primary Colour:</label>
            <select className="border p-2 w-64 cursor-pointer">
              <option>Black</option>
              <option>White</option>
              <option>Silver/Grey</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Green</option>
              <option>Yellow</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Location Lost:</label>
            <input className="border p-2 w-64 cursor-pointer" type="text" />
          </div>

          {/* Submit & Back buttons */}
          <div className="flex justify-around  mt-6">
            <button
              type="submit"
              className="bg-teal-600 text-white px-8 py-2 rounded cursor-pointer hover:bg-emerald-600"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-8 py-2 rounded cursor-pointer hover:bg-blue-600"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StaffAddItemPage;
