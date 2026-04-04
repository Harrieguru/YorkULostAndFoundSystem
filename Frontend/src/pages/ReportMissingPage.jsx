import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export const ReportMissingPage = () => {
  const [form, setForm] = useState({
    item_category: "Electronics",
    item_type: "",
    brand: "",
    material: "Metal",
    primary_colour: "Black",
    description: "",
    date_lost: "",
    location_lost: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post("http://localhost:3000/api/production/submit-report", {
        ...form,
        user_id: user.userId,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit report. Please try again.");
    }
  };

  if (submitted)
    return (
      <div className="text-center mt-20">
        <p className="text-green-600 font-semibold text-lg">
          Report submitted successfully!
        </p>
      </div>
    );

  return (
    <>
      <div className="text-black">
        <h3 className="text-left text-lg font-bold">Report Missing Item</h3>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="flex items-center justify-enter mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Category */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Category:</label>
            <select
              className="border p-2 w-64 cursor-pointer"
              onChange={handleChange}
              value={form.item_category}
              name="item_category"
            >
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
            <input
              name="item_type"
              value={form.item_type}
              onChange={handleChange}
              className="border p-2 w-64 cursor-pointer"
              type="text"
              required
            />
          </div>

          {/* Brand */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Brand:</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="border p-2 w-64 cursor-pointer"
              type="text"
            />
          </div>

          {/* Material */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Material:</label>
            <select
              name="material"
              onChange={handleChange}
              value={form.material}
              className="border p-2 w-64 cursor-pointer"
            >
              <option>Metal</option>
              <option>Plastic</option>
              <option>Fabric</option>
              <option>Other</option>
            </select>
          </div>

          {/* Colour */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Primary Colour:</label>
            <select
              name="primary_colour"
              onChange={handleChange}
              value={form.primary_colour}
              className="border p-2 w-64 cursor-pointer"
            >
              <option>Black</option>
              <option>White</option>
              <option>Silver/Grey</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Green</option>
              <option>Yellow</option>
              <option>Other</option>
            </select>

            {/* Date lost */}
          </div>
          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Date Lost:</label>
            <input
              name="date_lost"
              value={form.date_lost}
              onChange={handleChange}
              className="border p-2 w-64"
              type="date"
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Location Lost:</label>
            <select
              name="location_lost"
              value={form.location_lost}
              onChange={handleChange}
              className="border p-2 w-64 cursor-pointer"
            >
              <option value="">Select location...</option>
              <option value="VH">Vari Hall (VH)</option>
              <option value="DB">Dahdaleh Building (DB)</option>
              <option value="LAS">Lassonde (LAS)</option>
              <option value="CLH">Central Lane Hall (CLH)</option>
              <option value="TM">Tait McKenzie (TM)</option>
              <option value="ACW">Accolade West (ACW)</option>
              <option value="SCL">Scott Library (SCL)</option>
              <option value="Other">Other</option>
            </select>
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
