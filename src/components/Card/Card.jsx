import React, { useState } from "react";
import { FavoriteIcon } from "../../components/FavoriteIcon/FavoriteIcon";
import "./Card.css";

export const Card = ({ candidate, onFavoriteChanged }) => {
  const [isShown, setIsShown] = useState(candidate.isFavorite);
  const handleFavoriteClick = () => {
    if (onFavoriteChanged) {
      setIsShown(!candidate.isFavorite);
      onFavoriteChanged(candidate.uuid);
    }
  };

  const evaluateFavorite = (hoverInput) => {
    setIsShown(candidate.isFavorite || hoverInput);
  }

  return (
    <div className="card"
      onClick={handleFavoriteClick}
      onMouseEnter={() => evaluateFavorite(true)}
      onMouseLeave={() => evaluateFavorite(false)}>
      <div className="card-info-picture-container">
        <img className="card-picture" src={candidate.picture} alt="" />
        <div className="card-info">
          <div className="card-info-details">
            <div className="card-info-name">
              {candidate.firstName} {candidate.lastName}
            </div>
            {candidate.isPreferred && <div className="card-info-perferred">PERFERRED</div>}
          </div>
          <div className="card-info-text">
            <div className="card-info-email">
              {candidate.email}
            </div>
            <div className="card-info-location">
              {candidate.city}, {candidate.country}
            </div>
          </div>
        </div>
      </div>
      {isShown && <FavoriteIcon />}
    </div >
  );
};
