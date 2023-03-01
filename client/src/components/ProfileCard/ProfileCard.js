import "./ProfileCard.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import Card from "react-bootstrap/Card";
import useConvertTime from "../../hooks/useConvertTime";
import PencilIcon from "../../assets/pencil-icon.png";
import ProfileEncounters from "../ProfileEncounters/ProfileEncounters";
// import ProfileFavourites from "../ProfileFavourites/ProfileFavourites";

function ProfileCard(props) {
  const { setIsEditing, isEditing } = props;
  const { userProfile, getProfile } = useContext(AuthContext);
  const convertTime = useConvertTime();

  useEffect(() => {
    getProfile();
  }, []);

  function handleOpenUpdateProfileCard() {
    setIsEditing(true);
  }

  return (
    <>
      {userProfile && (
        <div className="profile-container">
          <Card className="profile-card">
            <span className="edit-icon">
              <img
                src={PencilIcon}
                alt="Edit"
                onClick={handleOpenUpdateProfileCard}
              />
            </span>
            <span className="user-picture">
              <img src={userProfile.userPicture} alt="Avatar"></img>
            </span>
            <div className="user-details">
              <span className="profile-part">
                <p id="profile-title">username: </p>
                <p id="profile-detail">{userProfile.userName}</p>
              </span>
              <span className="profile-part">
                <p id="profile-title">e-mail address: </p>
                <p id="profile-detail">{userProfile.email}</p>
              </span>
              <span className="profile-part">
                <p id="profile-title">member since: </p>
                <p id="profile-detail">{convertTime(userProfile.signupTime)}</p>
              </span>{" "}
              <span className="profile-part">
                <p id="profile-title">status: </p>
                {userProfile.isAdmin === true ? (
                  <p id="profile-detail">admin</p>
                ) : (
                  <p id="profile-detail">user</p>
                )}
              </span>
            </div>
            <hr />
            <ProfileEncounters />
            <hr />
            {/* <ProfileFavourites /> */}
          </Card>
        </div>
      )}
    </>
  );
}

export default ProfileCard;
