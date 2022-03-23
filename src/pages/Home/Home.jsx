import React, { useEffect, useState } from "react";
import "./Home.css";
import { fetchCandidates } from "../../utils/API.js";
import { getCandidatesArray, getPersistentCandidatesData, setPersistentCandidatesData, transformCandidatesData, transformCandidates } from "../../utils/helper.js";
import { Card } from "../../components/Card/Card";

export const Home = () => {

  const [candidates, setCandidatesFunction] = useState([]);

  useEffect(() => {
    runOnHomePageLoad();
  }, []);

  const runOnHomePageLoad = async () => {
    const data = getPersistentCandidatesData();
    if (data) {
      const stateData = getCandidatesArray(data);
      setCandidatesFunction(stateData);
    } else {
      const fetchedData = await fetchCandidates();
      const transformedData = transformCandidatesData(fetchedData);
      setPersistentCandidatesData(transformedData);

      const stateData = getCandidatesArray(transformedData);
      setCandidatesFunction(stateData);
    }
  }

  const onFavoriteChanged = (uuid) => {
    const candidateIndex = candidates.findIndex(c => c.uuid == uuid);
    candidates[candidateIndex].isFavorite = !candidates[candidateIndex].isFavorite;
    setCandidatesFunction(candidates);
    const transformedData = transformCandidates(candidates);
    setPersistentCandidatesData(transformedData);
  }

  const getCandidateCards = () => {
    return candidates.map((candidate) => <Card key={candidate.uuid} candidate={candidate} onFavoriteChanged={onFavoriteChanged} />);
  }

  return (
    <div id="home">
      <div className="wrapper">
        <div className="home-info">
          <div className="home-title">Firm's candidates</div>
          <div className="home-subtitle">Raz Ben Sasson</div>
        </div>
        <div className="candidates-list scrollbox">
          {getCandidateCards()}
        </div>
      </div>
    </div>
  );
};