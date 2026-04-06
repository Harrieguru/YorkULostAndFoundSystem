import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const LOCATIONS = [
  { value: "VH", label: "Vari Hall (VH)" },
  { value: "DB", label: "Dahdaleh Building (DB)" },
  { value: "LAS", label: "Lassonde (LAS)" },
  { value: "CLH", label: "Central Lane Hall (CLH)" },
  { value: "TM", label: "Tait McKenzie (TM)" },
  { value: "ACW", label: "Accolade West (ACW)" },
  { value: "SCL", label: "Scott Library (SCL)" },
];

export const StaffAddItemPage = () => {
  const [form, setForm] = useState({
    item_category: "Electronics",
    item_type: "",
    brand: "",
    material: "Metal",
    primary_colour: "Black",
    description: "",
    date_found: "",
    location_found: "VH",
  });
  const [reports, setReports] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Image upload state (kept from your original)
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  //selected report state
  const [selectedReport, setSelectedReport] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/production/all-item-reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.error(err));
  }, []);

  //selects pending report
  const selectReport = (r) => {
    setSelectedReport(r);
    setForm({
      item_category: r.item_category,
      item_type: r.item_type,
      brand: r.brand || "",
      material: r.material || "Metal",
      primary_colour: r.primary_colour,
      description: r.description || "",
      date_found: "",
      location_found: r.location_lost || "VH",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Image handlers
  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
    } else {
      alert("Please upload an image file");
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };
  const handleClick = () => fileInputRef.current.click();
  const handleFileInputChange = (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  };
  const removeImage = () => {
    if (image) URL.revokeObjectURL(image);
    setImage(null);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  //refined handle submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Get user and token from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      setError("You must be logged in as staff.");
      return;
    }

    try {
      // Add found item with auth header
      await axios.post(
        "http://localhost:3000/api/production/add-found-item",
        {
          ...form,
          username: user.username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        },
      );

      // If a report was selected, resolve it
      if (selectedReport) {
        await axios.patch(
          "http://localhost:3000/api/production/resolve-report",
          {
            first_name: selectedReport.first_name,
            last_name: selectedReport.last_name,
            item_type: selectedReport.item_type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      // Check if the error is auth-related
      if (err.response?.status === 401) {
        setError("Session expired or unauthorized. Please log in again.");
        // Optional: clear localStorage to force login
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } else {
        setError("Failed to add item. Please try again.");
      }
    }
  };

  if (submitted)
    return (
      <div className="text-center mt-20">
        <p className="text-green-600 font-semibold text-lg">
          Item added to inventory!
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-blue-500 hover:underline text-sm"
        >
          Add another item
        </button>
      </div>
    );

  return (
    <div className="flex gap-8">
      {/* Left: form */}
      <div className="flex-1">
        <h3 className="text-left text-lg font-bold mb-6">Add Found Item</h3>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-2xl"
        >
          {/* Image Upload (kept from your original) */}
          <div className="flex flex-col items-center">
            <label className="text-lg font-medium mb-2 self-start">
              Item Image (Optional)
            </label>
            <div
              onClick={handleClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full max-w-md h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Category:</label>
            <select
              name="item_category"
              value={form.item_category}
              onChange={handleChange}
              className="border p-2 w-64 cursor-pointer"
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

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Item Type:</label>
            <input
              name="item_type"
              value={form.item_type}
              onChange={handleChange}
              className="border p-2 w-64"
              type="text"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Brand:</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="border p-2 w-64"
              type="text"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Material:</label>
            <select
              name="material"
              value={form.material}
              onChange={handleChange}
              className="border p-2 w-64 cursor-pointer"
            >
              <option>Metal</option>
              <option>Plastic</option>
              <option>Fabric</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Primary Colour:</label>
            <select
              name="primary_colour"
              value={form.primary_colour}
              onChange={handleChange}
              className="border p-2 w-64 cursor-pointer"
            >
              <option>Black</option>
              <option>White</option>
              <option>Silver/Grey</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Green</option>
              <option>Yellow</option>
              <option>Orange</option>
              <option>Purple</option>
              <option>Pink</option>
              <option>Brown</option>
              <option>Gold</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Description:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border p-2 w-64"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Date Found:</label>
            <input
              name="date_found"
              value={form.date_found}
              onChange={handleChange}
              className="border p-2 w-64"
              type="date"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right">Location Found:</label>
            <select
              name="location_found"
              value={form.location_found}
              onChange={handleChange}
              className="border p-2 w-64 cursor-pointer"
            >
              {LOCATIONS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-around mt-6">
            <button
              type="submit"
              className="bg-teal-600 text-white px-8 py-2 rounded cursor-pointer hover:bg-emerald-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="bg-blue-500 text-white px-8 py-2 rounded cursor-pointer hover:bg-blue-600"
            >
              Back
            </button>
          </div>
        </form>
      </div>

      {/* Right: Pending reports panel */}
      <div className="w-80 shrink-0">
        <h3 className="text-lg font-bold mb-4">Pending User Reports</h3>
        {reports.length === 0 ? (
          <p className="text-sm text-gray-400">No reports yet.</p>
        ) : (
          <div className="flex flex-col gap-3 max-h-[80vh] overflow-y-auto pr-1">
            {reports
              .filter((r) => r.report_status === "pending")
              .map((r, i) => (
                <div
                  key={i}
                  onClick={() => selectReport(r)}
                  className="bg-white border border-gray-200 rounded-xl p-3 text-sm cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-colors"
                >
                  <p className="font-semibold">
                    {r.item_type} — {r.item_category}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{r.description}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Lost: {r.date_lost?.slice(0, 10)} at {r.location_lost}
                  </p>
                  <p className="text-gray-400 text-xs">
                    By: {r.first_name} {r.last_name}
                  </p>
                  <span className="text-xs mt-1 inline-block px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700">
                    {r.report_status}
                  </span>
                  <p className="text-teal-600 text-xs mt-1 font-medium">
                    Click to pre-fill form
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffAddItemPage;
