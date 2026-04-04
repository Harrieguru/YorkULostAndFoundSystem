const CATEGORIES = [
  "Electronic",
  "Clothing",
  "Accessories",
  "Documents",
  "Other",
];
const COLOURS = ["Blue", "Black", "Red", "White", "Green", "Yellow"];

export default function Sidebar({ filters, onChange }) {
  return (
    <aside className="w-52 shrink-0">
      <div className="bg-white border rounded-lg p-4 space-y-5">
        <div>
          <p className="font-semibold text-sm text-gray-700 mb-2">Category</p>
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm py-0.5 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => onChange("category", cat)}
              />
              {cat}
            </label>
          ))}
        </div>
        <div>
          <p className="font-semibold text-sm text-gray-700 mb-2">Colour</p>
          {COLOURS.map((colour) => (
            <label
              key={colour}
              className="flex items-center gap-2 text-sm py-0.5 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.colours.includes(colour)}
                onChange={() => onChange("colour", colour)}
              />
              {colour}
            </label>
          ))}
        </div>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm rounded py-1.5 transition-colors">
          Apply
        </button>
      </div>
    </aside>
  );
}
