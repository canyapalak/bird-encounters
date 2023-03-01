import "./EncounterDetails.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import MapIcon from "../../assets/map-icon.png";
import DeleteIcon from "../../assets/trash-icon.png";
import EditIcon from "../../assets/pencil-icon.png";
import useConvertTime from "../../hooks/useConvertTime";
import MapModal from "../MapModal/MapModal";
import { getToken } from "../../utils/getToken";
import { AuthContext } from "../../store/AuthContext";
import Comments from "../Comments/Comments";

function EncounterDetails(props) {
  const { setIsEditing, isEditing } = props;
  const redirectTo = useNavigate();
  const [oneEncounter, setOneEncounter] = useState("");
  const [error, setError] = useState();
  const { _id } = useParams();
  const [showMap, setShowMap] = useState(false);
  const handleCloseMap = () => setShowMap(false);
  const handleShowMap = () => setShowMap(true);
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
  const [isDeleteFail, setIsDeleteFail] = useState(false);
  const convertTime = useConvertTime();
  const token = getToken();
  const { userProfile, getProfile } = useContext(AuthContext);

  function handleOpenUpdateCard() {
    setIsEditing(true);
  }

  console.log("userProfile", userProfile);

  useEffect(() => {
    setIsEditing(false);
    getProfile();
    const fetchEncounterById = async () => {
      try {
        const urlFetchEncounterById = `http://localhost:5000/api/encounters/${_id}`;
        const response = await fetch(urlFetchEncounterById);
        const results = await response.json();

        setOneEncounter(results.requestedId[0]);
      } catch (error) {
        console.log("error", error);
        setError(error);
      }
    };

    fetchEncounterById();
  }, []);

  console.log("oneEncounter :>> ", oneEncounter);

  //delete encounter
  function handleDeleteEncounter() {
    setIsDeleteFail(false);
    setIsDeleteSuccessful(false);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      _id: oneEncounter._id,
    });

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/api/encounters/deleteEncounter",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.msg === "Encounter deleted successfully") {
          setIsDeleteSuccessful(true);
          setTimeout(() => redirectTo("/encounters"), 2000);
          console.log("isDeleteSuccessful", isDeleteSuccessful);
        }
        if (result.msg === "Encounter not found") {
          setIsDeleteSuccessful(true);
          console.log("isDeleteFail :>> ", isDeleteFail);
        }
      })
      .catch((error) => {
        console.log("error :>> ", error);
        setIsDeleteFail(true);
      });
  }

  return (
    <div className="details-container">
      <Card className="details-card">
        <span className="card-img">
          <img src={oneEncounter.image} alt="Encounter Image" />
        </span>
        {userProfile &&
          (userProfile.isAdmin ||
            oneEncounter.userName === userProfile.userName) && (
            <span className="edit-and-delete-icons">
              <img src={DeleteIcon} alt="Delete" onClick={handleShowDelete} />
              <Modal
                show={showDelete}
                onHide={handleCloseDelete}
                className="signup-modal"
              >
                <Modal.Body>
                  {!isDeleteSuccessful && !isDeleteFail && (
                    <p>Are you sure you want to delete this encounter?</p>
                  )}
                  {isDeleteSuccessful && (
                    <p>You have successfully deleted the encounter.</p>
                  )}
                  {isDeleteFail && (
                    <p id="error-message">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  {isDeleteSuccessful ? null : (
                    <Button
                      variant="primary"
                      className="signup-modal-button"
                      onClick={handleDeleteEncounter}
                    >
                      Delete
                    </Button>
                  )}
                </Modal.Footer>
              </Modal>

              <img src={EditIcon} alt="Edit" onClick={handleOpenUpdateCard} />
            </span>
          )}
        <div className="avatar-username-and-post-time">
          <div className="avatar-and-username">
            <span className="avatar">
              <img src={oneEncounter.userPicture} alt="Avatar" />
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
        <hr />
        <Comments oneEncounter={oneEncounter} />
      </Card>
    </div>
  );
}

export default EncounterDetails;
