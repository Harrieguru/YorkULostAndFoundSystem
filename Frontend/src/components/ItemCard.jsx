import placeholderImg from "../assets/placehold.jpg";
import electronics from "../assets/electronics.jpg";
import clothing from "../assets/clothing.jpg";
import sports from "../assets/sports.jpg";
import books from "../assets/books.png";
import bags from "../assets/bags.jpg";
import identification from "../assets/identification.jpg";
import personal from "../assets/personal.jpg";
import other from "../assets/other.jpg";

const CATEGORY_IMG = {
  Electronics: electronics,
  Clothing: clothing,
  Sports: sports,
  Books: books,
  Bags: bags,
  Identification: identification,
  Personal: personal,
  Other: other || placeholderImg,
};

const COLOUR_MAP = {
  Blue: "#3b82f6",
  Black: "#1f2937",
  Red: "#ef4444",
  White: "#e5e7eb",
  Green: "#22c55e",
  Yellow: "#eab308",
  Orange: "#f97316",
  Purple: "#a855f7",
  Pink: "#ec4899",
  Brown: "#92400e",
  Gold: "#ca8a04",
  "Silver/Grey": "#9ca3af",
};

export const ItemCard = ({ item }) => {
  return (
    <>
      <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer">
        <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-gray-50 transition-colors">
          <div className="aspect-square bg-gray-100 overflow-hidden group-hover:bg-gray-50 transition-colors">
            <img
              src={CATEGORY_IMG[item.item_category] ?? other}
              alt={item.item_category}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="p-3">
          <p className="text-sm font-semibold text-gray-800">
            {item.item_type}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{item.item_category}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full border border-gray-200 flex-shrink-0"
              style={{
                backgroundColor: COLOUR_MAP[item.primary_colour] ?? "#d1d5db",
              }}
            />
            <span className="text-xs text-gray-500">{item.primary_colour}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
