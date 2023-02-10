import "./MapPage.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import GeneralMap from "../../components/GeneralMap/GeneralMap";
import SmallLogo from "../../components/assets/cropped.png";

function MapPage() {
  return (
    <>
      <NavigationBar />
      <div className="title-and-logo">
        <img src={SmallLogo} alt="Logo" id="small-logo" />
        <p>map</p>
      </div>
      <hr id="line"></hr>
      <GeneralMap />
    </>
  );
}

export default MapPage;
