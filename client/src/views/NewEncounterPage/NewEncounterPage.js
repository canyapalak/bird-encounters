import "./NewEncounterPage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import SmallLogo from "../../assets/cropped.png";
import NewEncounterCard from "../../components/NewEncounterCard/NewEncounterCard";
import BackIcon from "../../assets/back-icon.png";
import { useNavigate } from "react-router-dom";

function NewEncounterPage() {
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
        <p>new encounter</p>
      </div>
      <hr id="line"></hr>
      <NewEncounterCard />
    </>
  );
}

export default NewEncounterPage;
