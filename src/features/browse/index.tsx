import React from "react";
import { useSelector } from "react-redux";

const Browse: React.FC = () => {
  const lots = useSelector((state) => state.browse.lots);

  return (
    <div>
      <h2>All Lots</h2>
      {lots.map((lot) => (
        <div key={lot.id}>
          <h3>Lot ID: {lot.id}</h3>
          <img src={lot.thumbnail} alt={`Thumbnail for lot ${lot.id}`} />
          <p>Last Modified: {lot.lastModified}</p>
          <p>Number of Items: {lot.items.length}</p>
          {/* You can add a link here to navigate to the lot overview page for this lot */}
        </div>
      ))}
    </div>
  );
};

export default Browse;
