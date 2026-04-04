import React from "react";
import { ItemCard } from "./ItemCard";

export const ItemGrid = ({ items }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => {
        <ItemCard key={item.id} item={item} />;
      })}
    </div>
  );
};

export default ItemGrid;
