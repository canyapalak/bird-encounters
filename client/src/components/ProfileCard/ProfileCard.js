import "./ProfileCard.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import Card from "react-bootstrap/Card";
import useConvertTime from "../../hooks/useConvertTime";
import PencilIcon from "../../assets/pencil-icon.png";
import { Link } from "react-router-dom";

function ProfileCard(props) {
  const { setIsEditing, isEditing } = props;
  const { userProfile, getProfile } = useContext(AuthContext);
  const convertTime = useConvertTime();
  const [encountersByUserName, setEncountersByUserName] = useState(null);

  useEffect(() => {
    getProfile();
    fetchEncounterByUserName();
  }, []);

  function handleOpenUpdateProfileCard() {
    setIsEditing(true);
  }

  //fetch user encounters
  const fetchEncounterByUserName = async () => {
    const userNameToUse = userProfile.userName;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:5000/api/encounters/by/${userNameToUse}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setEncountersByUserName(result.requestedEncounters);
      })

      .catch((error) => console.log("error", error));
  };

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
            <div className="user-encounters">
              <p id="part-title">encounters</p>
              <span className="encounters-part">
                <span className="encounters-text">
                  {!encountersByUserName ? (
                    <p>You have currently no encounters.</p>
                  ) : (
                    <p>
                      You have {encountersByUserName.length} encounter(s) so
                      far.
                    </p>
                  )}
                </span>
                <span className="encounter-part-card">
                  {encountersByUserName &&
                    encountersByUserName.map((userEncounter) => {
                      return (
                        <Link
                          to={`/${userEncounter._id}`}
                          key={userEncounter._id}
                        >
                          <Card className="one-user-encounter">
                            <img
                              src={userEncounter.image}
                              alt="Encounter Image"
                            />
                            <span className="one-user-encounter-text">
                              <p id="one-user-encounter-title">
                                {userEncounter.title}
                              </p>
                              <p id="one-user-encounter-species">
                                {userEncounter.species}
                              </p>
                              <p id="one-user-encounter-country">
                                {userEncounter.country}
                              </p>
                            </span>
                          </Card>
                        </Link>
                      );
                    })}
                </span>
              </span>
            </div>
            <hr />
            <div className="user-bookmarks">
              <p id="part-title">favourites</p>
              <span className="bookmarks-part">
                <p>You have currently no favourites.</p>
              </span>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

export default ProfileCard;
