import "./EncounterCards.css";
import React, { useContext, useEffect, useState } from "react";
import { EncounterContext } from "../../store/EncounterContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import BookmarkEmpty from "../assets/bookmark-empty.png";
import BookmarkFilled from "../assets/bookmark-filled.png";

function EncounterCards() {
  const { fetchAllEncounters, encounters } = useContext(EncounterContext);
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
                    <p id="posted-by">posted by&nbsp;</p>
                    <p id="username-text">{encounter.username}</p>
                  </span>
                  <span className="post-time">
                    <p id="posted-by">on&nbsp;</p>
                    <p id="post-time-text">{postTime(encounter.posttime)}</p>
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
