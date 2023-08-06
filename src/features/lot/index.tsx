import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentProductIndex, setEditing } from "../browse/browse"; // Import the action

const Lot: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLotIndex = useSelector((state) => state.browse.currentLotIndex);
  const lot = useSelector((state) => state.browse.lots[currentLotIndex]);

  const handleProductClick = (productIndex: number) => {
    dispatch(setCurrentProductIndex(productIndex));
    dispatch(setEditing(true));
    navigate("/product");
  };

  return (
    <div>
      <h2>Products in Lot {currentLotIndex}</h2>
      {lot?.items.map((product, index) => (
        <div key={product.id} onClick={() => handleProductClick(index)}>
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
