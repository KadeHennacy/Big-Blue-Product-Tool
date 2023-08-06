import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentLotIndex } from "./browse";

const Browse: React.FC = () => {
  const lots = useSelector((state) => state.browse.lots);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLotClick = (index: number) => {
    dispatch(setCurrentLotIndex(index));
    navigate("/lot");
  };

  return (
    <div>
      <h2>All Lots</h2>
      {lots.map((lot, index) => (
        <div key={lot.id} onClick={() => handleLotClick(index)}>
          <h3>Lot ID: {lot.id}</h3>
          <img src={lot.thumbnail} alt={`Thumbnail for lot ${lot.id}`} />
          <p>Last Modified: {lot.lastModified}</p>
          <p>Number of Items: {lot.items.length}</p>
          {/* You can style this div to look like a clickable card or add a button for better UX */}
        </div>
      ))}
    </div>
  );
};

export default Browse;
