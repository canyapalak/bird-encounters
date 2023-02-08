import "./Details.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import EncounterDetails from "../../components/EncounterDetails/EncounterDetails";
import SmallLogo from "../../components/assets/cropped.png";

function Encounters() {
  return (
    <>
      <NavigationBar />
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
