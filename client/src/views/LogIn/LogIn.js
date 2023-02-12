import "./LogIn.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import LogInCard from "../../components/LogInCard/LogInCard";
import SmallLogo from "../../components/assets/cropped.png";

function LogIn() {
  return (
    <>
      <NavigationBar />
      <div className="title-and-logo">
        <img src={SmallLogo} alt="Logo" id="small-logo" />
        <p>log in</p>
      </div>
      <hr id="line"></hr>
      <LogInCard />
    </>
  );
}

export default LogIn;
