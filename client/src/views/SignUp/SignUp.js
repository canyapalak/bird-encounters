import "./SignUp.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import SignUpCard from "../../components/SignUpCard/SignUpCard";
import SmallLogo from "../../assets/cropped.png";

function Encounters() {
  return (
    <>
      <NavigationBar />
      <div className="title-and-logo">
        <img src={SmallLogo} alt="Logo" id="small-logo" />
        <p>sign up</p>
      </div>
      <hr id="line"></hr>
      <SignUpCard />
    </>
  );
}

export default Encounters;
