import "./Details.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import EncounterDetails from "../../components/EncounterDetails/EncounterDetails";
import SmallLogo from "../../assets/cropped.png";
import BackIcon from "../../assets/back-icon.png";
import { useNavigate } from "react-router-dom";
import UpdateEncounterCard from "../../components/UpdateEncounterCard/UpdateEncounterCard";
import { useState } from "react";

function Details() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  function handleBackIconOnUpdate() {
    navigate(-1);
    setIsEditing(false);
  }

  return (
    <>
      <NavigationBar />
      <span>
        {!isEditing ? (
          <img
            src={BackIcon}
            alt="Back"
            onClick={() => {
              navigate(-1);
            }}
            id="back-icon"
          />
        ) : (
          <img
            src={BackIcon}
            alt="Back"
            onClick={handleBackIconOnUpdate}
            id="back-icon"
          />
        )}
      </span>
      <div className="title-and-logo">
        <img src={SmallLogo} alt="Logo" id="small-logo" />
        {!isEditing ? <p>details</p> : <p>update encounter</p>}
      </div>
      <hr id="line"></hr>
      {isEditing ? (
        <UpdateEncounterCard
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        />
      ) : (
        <EncounterDetails setIsEditing={setIsEditing} isEditing={isEditing} />
      )}
    </>
  );
}

export default Details;
