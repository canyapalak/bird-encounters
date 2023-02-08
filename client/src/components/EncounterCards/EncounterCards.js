import "./EncounterCards.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function EncounterCards() {
  const [encounters, setEncounters] = useState();
  const [error, setError] = useState();

  const fetchAllEncounters = async () => {
    try {
      const urlAllEncounters = "http://localhost:5000/api/encounters/all";
      const response = await fetch(urlAllEncounters);
      const results = await response.json();
      console.log("results :>> ", results.allEncounters);

      setEncounters(results.allEncounters);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchAllEncounters();
  }, []);

  return (
    <div className="cards-container">
      {encounters &&
        encounters.map((encounter, index) => {
          return (
            <Card className="one-card" key={index}>
              <span className="card-img">
                <img src={encounter.image} alt="Encounter Image" />
              </span>
              <p>{encounter.username}</p>
              <p>{encounter.favs}</p>
              <p>{encounter.posttime}</p>
              <hr />
              <p>{encounter.title}</p>
              <p>{encounter.location.area}</p>
            </Card>
          );
        })}
    </div>
  );
}

export default EncounterCards;
