import "./Encounters.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import EncounterCards from "../../components/EncounterCards/EncounterCards";
import SmallLogo from "../../assets/cropped.png";

function Encounters() {
  return (
    <>
      <NavigationBar />
      <div className="title-and-logo">
        <img src={SmallLogo} alt="Logo" id="small-logo" />
        <p>encounters</p>
      </div>
      <hr id="line"></hr>
      <EncounterCards />
    </>
  );
}

export default Encounters;
