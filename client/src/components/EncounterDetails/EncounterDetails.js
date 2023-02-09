import "./EncounterDetails.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PlaceholderAvatar from "../assets/avatar-placeholder.png";
import MapIcon from "../../components/assets/map-icon.png";

function EncounterDetails() {
  const [oneEncounter, setOneEncounter] = useState("");
  const [error, setError] = useState();
  const { _id } = useParams();

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
    const fetchEncounterById = async () => {
      try {
        const urlFetchEncounterById = `http://localhost:5000/api/encounters/${_id}`;
        const response = await fetch(urlFetchEncounterById);
        const results = await response.json();
        // console.log("results :>> ", results);

        setOneEncounter(results.requestedId[0]);
      } catch (error) {
        console.log("error", error);
        setError(error);
      }
    };

    fetchEncounterById();
  }, []);
  console.log("oneEncounter :>> ", oneEncounter);
  return (
    <div className="details-container">
      <Card className="details-card">
        <span className="card-img">
          <img src={oneEncounter.image} alt="Encounter Image" />
        </span>
        <div className="avatar-username-and-post-time">
          <div className="avatar-and-username">
            <span className="avatar">
              <img src={PlaceholderAvatar} alt="Avatar" />
            </span>
            <span className="details-username">
              <p>{oneEncounter.username}</p>
            </span>
          </div>
          <span className="details-post-time">
            <p>{postTime(oneEncounter.posttime)}</p>
          </span>
        </div>
        <hr />
        <div className="info-and-map">
          <div className="species-location-coordination">
            <span className="species">
              <p className="small-title">species: &nbsp;</p>
              <p>{oneEncounter.species}</p>
            </span>
            <span className="location">
              <p className="small-title">location: &nbsp;</p>
              <p>
                {oneEncounter && oneEncounter.location
                  ? `${oneEncounter.location.area}, ${oneEncounter.location.province}, ${oneEncounter.location.country}`
                  : "-"}
              </p>
            </span>
            <span className="coordinates">
              <p className="small-title">coordinates: &nbsp;</p>
              <p>
                {oneEncounter && oneEncounter.coordinates
                  ? `${oneEncounter.coordinates.latitude}, ${oneEncounter.coordinates.longitude}`
                  : "-"}{" "}
              </p>
            </span>
          </div>
          <img src={MapIcon} alt="Map" />
        </div>
        <hr />
      </Card>
    </div>
  );
}
export default EncounterDetails;
