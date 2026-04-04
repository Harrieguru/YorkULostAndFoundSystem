import placeholderImg from "../assets/placehold.jpg";

export const ItemCard = ({ item }) => {
  return (
    <>
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
        <img
          src={item.imageUrl || placeholderImg}
          alt={item.name}
          className="w-full h-36 object-cover"
        />
        <div className="p-3">
          <p className="font-medium text-sm text-gray-800">{item.name}</p>
          <p className="text-xs text-gray-500">
            {item.category} · {item.colour}
          </p>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
