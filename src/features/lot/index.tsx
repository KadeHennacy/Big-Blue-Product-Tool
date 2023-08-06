import React from "react";
import { useSelector } from "react-redux";

const Lot: React.FC = () => {
  const currentLotIndex = useSelector((state) => state.browse.currentLotIndex);
  const lot = useSelector((state) => state.browse.lots[currentLotIndex]);

  return (
    <div>
      <h2>Products in Lot {currentLotIndex}</h2>
      {lot?.items.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <img src={product.image} alt={product.name} />
        </div>
      ))}
    </div>
  );
};

export default Lot;
