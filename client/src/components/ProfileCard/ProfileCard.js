import "./ProfileCard.css";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import Card from "react-bootstrap/Card";
import useConvertTime from "../../hooks/useConvertTime";
import PencilIcon from "../../assets/pencil-icon.png";

function ProfileCard() {
  const { currentUser } = useContext(AuthContext);
  const convertTime = useConvertTime();

  console.log("currentUser :>> ", currentUser);

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <span className="edit-icon">
          <img src={PencilIcon} alt="Edit" />
        </span>
        <span className="user-picture">
          <img src={currentUser.userPicture} alt="Avatar"></img>
        </span>
        <div className="user-details">
          <span className="profile-part">
            <p id="profile-title">username: </p>
            <p id="profile-detail">{currentUser.userName}</p>
          </span>
          <span className="profile-part">
            <p id="profile-title">e-mail address: </p>
            <p id="profile-detail">{currentUser.email}</p>
          </span>
          <span className="profile-part">
            <p id="profile-title">member since: </p>
            <p id="profile-detail">{convertTime(currentUser.signupTime)}</p>
          </span>
        </div>
        <hr />
        <div className="user-encounters">
          <p id="part-title">encounters</p>
          <span className="encounters-part">
            <p>You have currently no encounters.</p>
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
  );
}
export default ProfileCard;
