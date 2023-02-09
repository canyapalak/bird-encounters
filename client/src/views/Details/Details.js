import "./Details.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import EncounterDetails from "../../components/EncounterDetails/EncounterDetails";
import SmallLogo from "../../components/assets/cropped.png";
import BackIcon from "../../components/assets/back-icon.png";
import { useNavigate } from "react-router-dom";

function Encounters() {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <span>
        <img
          src={BackIcon}
          alt="Back"
          onClick={() => navigate(-1)}
          id="back-icon"
        />
      </span>
      <div className="title-and-logo">
        <img src={SmallLogo} alt="Logo" id="small-logo" />
        <p>details</p>
      </div>
      <hr id="line"></hr>
      <EncounterDetails />
    </>
  );
}

export default Encounters;
