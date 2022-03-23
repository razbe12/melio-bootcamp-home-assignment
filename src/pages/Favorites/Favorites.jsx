import React, { useEffect, useState } from "react";
import "./Favorites.css";
import "../Home/Home.css";
import { getPersistentCandidatesData, getCandidatesArray } from "../../utils/helper.js";
import { Card } from "../../components/Card/Card";

export const Favorites = () => {
  const [candidates, setCandidatesFunction] = useState([]);

  useEffect(() => {
    runOnHomePageLoad();
  }, []);

  const runOnHomePageLoad = async () => {
    const data = getPersistentCandidatesData();
    if (data) {
      const stateData = getCandidatesArray(data).filter(candidate => candidate.isFavorite);
      setCandidatesFunction(stateData);
    }
  }

  const getFavoriteCandidates = () => {
    if (candidates.length > 0) {
      return candidates.map((candidate) => <Card key={candidate.uuid} candidate={candidate} />);
    }
    else {
      return <div className="favorites-empty">You don't have any favorite candidates yet</div>;
    }
  }

  return (
    <div id="home">
      <div className="wrapper">
        <div className="home-info">
          <div className="home-title">Favorite candidates</div>
          <div className="home-subtitle">Raz Ben Sasson</div>
        </div>
        <div className="candidates-list">
          {getFavoriteCandidates()}
        </div>
      </div>
    </div>
  );
};