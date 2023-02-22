import "./EncounterDetails.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Card from "react-bootstrap/Card";
import AvatarPlaceholder from "../../assets/avatar-placeholder.png";
import MapIcon from "../../assets/map-icon.png";
import useConvertTime from "../../hooks/useConvertTime";
import MapModal from "../MapModal/MapModal";

function EncounterDetails() {
  const [oneEncounter, setOneEncounter] = useState("");
  const [error, setError] = useState();
  const { _id } = useParams();
  const [showMap, setShowMap] = useState(false);
  const handleCloseMap = () => setShowMap(false);
  const handleShowMap = () => setShowMap(true);
  const convertTime = useConvertTime();

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
              <img src={AvatarPlaceholder} alt="Avatar" />
            </span>
            <span className="details-username">
              <p>{oneEncounter.userName}</p>
            </span>
          </div>
          <span className="details-post-time">
            <p>{convertTime(oneEncounter.posttime)}</p>
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
                {oneEncounter
                  ? `${oneEncounter.province}, ${oneEncounter.country}`
                  : "-"}
              </p>
            </span>
            <span className="coordinates">
              <p className="small-title">coordinates: &nbsp;</p>
              <p>
                {oneEncounter
                  ? `${oneEncounter.latitude}, ${oneEncounter.longitude}`
                  : "-"}{" "}
              </p>
            </span>
            <span className="encounter-time">
              <p className="small-title">encounter time: &nbsp;</p>
              <p>{convertTime(oneEncounter.time)}</p>
            </span>
            <span className="record">
              <p className="small-title">record: &nbsp;</p>
              {oneEncounter.record === "null" ||
              oneEncounter.record === null ||
              oneEncounter.record === "undefined" ? (
                <p>no record</p>
              ) : (
                <AudioPlayer src={oneEncounter.record} />
              )}
            </span>
          </div>
          <img src={MapIcon} alt="Map" onClick={handleShowMap} />
          <MapModal
            oneEncounter={oneEncounter}
            showMap={showMap}
            handleCloseMap={handleCloseMap}
          />
        </div>
        <hr />
        <div className="title-and-experience">
          <span className="details-title">
            <p>{oneEncounter.title}</p>
          </span>
          <span className="experience">
            <p>{oneEncounter.experience}</p>
          </span>
        </div>
      </Card>
    </div>
  );
}

export default EncounterDetails;
