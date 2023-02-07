import "../components/styles/EncounterCards.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import SmallLogo from "../components/assets/small-logo.png";

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
    <div className="encounter-cards-container">
      <img src={SmallLogo} alt="Logo" id="small-logo" />
      <div className="all-cards">
        {encounters &&
          encounters.map((encounter, index) => {
            return (
              <div className="one-card" key={index}>
                <Card style={{ width: "40rem" }} className="encounter-card">
                  <Card.Header>
                    <p>{encounter.title}</p>
                    <p>{encounter.username}</p>
                    <p>{encounter.location.area}</p>
                  </Card.Header>
                  <Card.Body>
                    <span className="card-img">
                      <img src={encounter.image} alt="Encounter Image" />
                    </span>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default EncounterCards;
