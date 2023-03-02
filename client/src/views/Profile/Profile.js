import "./Profile.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import SmallLogo from "../../assets/cropped.png";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UpdateProfileCard from "../../components/UpdateProfileCard/UpdateProfileCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BackIcon from "../../assets/back-icon.png";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  function handleBackIconOnUpdate() {
    navigate("/profile");
    setIsEditing(false);
  }
  return (
    <>
      <NavigationBar />
      {isEditing && (
        <span>
          <img
            src={BackIcon}
            alt="Back"
            onClick={handleBackIconOnUpdate}
            id="back-icon"
          />
        </span>
      )}
      <div className="title-and-logo">
        <img src={SmallLogo} alt="Logo" id="small-logo" />
        {!isEditing ? <p>profile</p> : <p>update profile</p>}
      </div>
      <hr id="line"></hr>
      {!isEditing ? (
        <ProfileCard setIsEditing={setIsEditing} isEditing={isEditing} />
      ) : (
        <UpdateProfileCard
          setIsEditing={setIsEditing}
          isEditing={(isEditing, setIsEditing)}
        />
      )}
    </>
  );
}

export default Profile;
