import React from "react";
import Navbar from "../components/Navbar";

export const ReportMissingPage = () => {
  return (
    <>
      <div className="text-black">
        <h3 className="text-left text-lg font-bold">Report Missing Item</h3>
      </div>
      <div className="flex items-center justify-enter mt-10">
        <form className="flex flex-col gap-4">
          {/* Category */}
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

          {/* Item Type */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Item Type:</label>
            <input className="border p-2 w-64 cursor-pointer" type="text" />
          </div>

          {/* Brand */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Brand:</label>
            <input className="border p-2 w-64 cursor-pointer" type="text" />
          </div>

          {/* Material */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Material:</label>
            <select className="border p-2 w-64 cursor-pointer">
              <option>Metal</option>
              <option>Plastic</option>
              <option>Fabric</option>
              <option>Other</option>
            </select>
          </div>

          {/* Colour */}
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

          {/* Location */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Location Lost:</label>
            <input className="border p-2 w-64 cursor-pointer" type="text" />
          </div>

          {/* Submit */}
          <div className="pl-44">
            <button className="bg-blue-500 text-white px-4 py-2 cursor-pointer hover:bg-blue-600">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReportMissingPage;
