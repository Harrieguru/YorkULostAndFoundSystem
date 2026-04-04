import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemCard from "../components/ItemCard";

//Constants
const CATEGORIES = [
  "Electronic",
  "Clothing",
  "Accessories",
  "Documents",
  "Other",
];
const COLOURS = ["Blue", "Black", "Red", "White", "Green", "Yellow"];

const COLOUR_MAP = {
  Blue: "#3b82f6",
  Black: "#1f2937",
  Red: "#ef4444",
  White: "#e5e7eb",
  Green: "#22c55e",
  Yellow: "#eab308",
};

const PAGE_SIZE = 6;

// Sidebar
function Sidebar({ filters, onChange, onApply, onClear }) {
  const activeCount = filters.categories.length + filters.colours.length;

  return (
    <aside className="w-52 shrink-0">
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-5 sticky top-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm text-gray-700">Filters</p>
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Category */}
        <div>
          <p className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-2">
            Category
          </p>
          {CATEGORIES.map((cat) => {
            const active = filters.categories.includes(cat);
            return (
              <label
                key={cat}
                className={`flex items-center gap-2.5 text-sm py-1 px-2 rounded-lg cursor-pointer transition-colors ${
                  active
                    ? "bg-red-50 text-red-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                    active ? "bg-red-600 border-red-600" : "border-gray-300"
                  }`}
                >
                  {active && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => onChange("category", cat)}
                  className="hidden"
                />
                {cat}
              </label>
            );
          })}
        </div>

        {/* Colour */}
        <div>
          <p className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-2">
            Colour
          </p>
          {COLOURS.map((colour) => {
            const active = filters.colours.includes(colour);
            return (
              <label
                key={colour}
                className={`flex items-center gap-2.5 text-sm py-1 px-2 rounded-lg cursor-pointer transition-colors ${
                  active
                    ? "bg-red-50 text-red-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                    active ? "bg-red-600 border-red-600" : "border-gray-300"
                  }`}
                >
                  {active && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => onChange("colour", colour)}
                  className="hidden"
                />
                <span
                  className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0"
                  style={{ backgroundColor: COLOUR_MAP[colour] }}
                />
                {colour}
              </label>
            );
          })}
        </div>

        {/* Apply */}
        <button
          onClick={onApply}
          className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg py-2 transition-colors"
        >
          Apply
        </button>
      </div>
    </aside>
  );
}

// Main Page
export const SearchInventoryPage = () => {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/production/all-lost-items")
      .then((res) => setAllItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Pending (in-sidebar) state
  const [pendingFilters, setPendingFilters] = useState({
    categories: [],
    colours: [],
  });
  // Applied (committed) state
  const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
    colours: [],
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const handleChange = (type, value) => {
    const key = type === "category" ? "categories" : "colours";
    setPendingFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleApply = () => {
    setAppliedFilters(pendingFilters);
    setVisibleCount(PAGE_SIZE);
  };

  const handleClear = () => {
    const empty = { categories: [], colours: [] };
    setPendingFilters(empty);
    setAppliedFilters(empty);
    setVisibleCount(PAGE_SIZE);
  };

  const filtered = allItems.filter((item) => {
    const catOk =
      appliedFilters.categories.length === 0 ||
      appliedFilters.categories.includes(item.item_category);
    const colOk =
      appliedFilters.colours.length === 0 ||
      appliedFilters.colours.includes(item.primary_colour);
    return catOk && colOk;
  });

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const activeCount =
    appliedFilters.categories.length + appliedFilters.colours.length;

  return (
    <div className="flex gap-6 p-6 min-h-screen bg-gray-50">
      <Sidebar
        filters={pendingFilters}
        onChange={handleChange}
        onApply={handleApply}
        onClear={handleClear}
      />

      <main className="flex-1 min-w-0">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Lost Items in Inventory
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Are you a member of staff adding items?{" "}
            <Link
              to="/staff/add"
              className="text-red-600 hover:underline font-medium"
            >
              Click Here.
            </Link>
          </p>
        </div>

        {/* Active filter pills */}
        {activeCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {[...appliedFilters.categories, ...appliedFilters.colours].map(
              (f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 text-xs px-2.5 py-1 rounded-full"
                >
                  {f}
                </span>
              ),
            )}
          </div>
        )}

        <p className="text-sm text-gray-500 mb-4">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} found.
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <svg
              className="w-12 h-12 mb-3 opacity-40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <p className="text-sm">No items match your filters.</p>
            <button
              onClick={handleClear}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayed.map((item) => (
                <ItemCard key={item.item_id} item={item} />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="px-6 py-2 border border-gray-300 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SearchInventoryPage;
