import "./EncounterCards.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import BookmarkEmpty from "../assets/bookmark-empty.png";
import BookmarkFilled from "../assets/bookmark-filled.png";

function EncounterCards() {
  const [encounters, setEncounters] = useState();
  const [error, setError] = useState();
  const [isToggled, setIsToggled] = useState(false);

  function handleClick() {
    setIsToggled(!isToggled);
  }

  const postTime = (dateAndTime) => {
    const date = new Date(dateAndTime).toLocaleDateString();
    const time = new Date(dateAndTime).toLocaleTimeString();
    return (
      <>
        {date} {time}
      </>
    );
  };

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
                <span className="post-image">
                  <img src={encounter.image} alt="Encounter Image" />
                </span>
              </span>
              <span className="title">
                <p>{encounter.title}</p>
              </span>
              <hr />
              <div className="username-and-favs">
                <div className="username-and-time">
                  <span className="username">
                    <p>{encounter.username}</p>
                  </span>
                  <span className="post-time">
                    <p>{postTime(encounter.posttime)}</p>
                  </span>
                </div>
                <div className="fav-icon-and-number">
                  <div onClick={handleClick} className="fav-icon">
                    {!isToggled ? (
                      <img src={BookmarkEmpty} alt="Not Fav" />
                    ) : (
                      <img src={BookmarkFilled} alt="Fav" />
                    )}
                  </div>
                  <span className="fav-number">
                    <p>{encounter.favs}</p>
                  </span>
                </div>
              </div>
              <hr />
              <Button variant="success" id="card-button">
                Details
              </Button>{" "}
            </Card>
          );
        })}
    </div>
  );
}

export default EncounterCards;
