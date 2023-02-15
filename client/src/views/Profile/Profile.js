import "./Profile.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import SmallLogo from "../../assets/cropped.png";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

function Profile() {
  return (
    <>
      <NavigationBar />
      <div className="title-and-logo">
        <img src={SmallLogo} alt="Logo" id="small-logo" />
        <p>profile</p>
      </div>
      <hr id="line"></hr>
      <ProfileCard />
    </>
  );
}

export default Profile;
