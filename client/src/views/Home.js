import "./styles/Home.css";
import BirdLogo from "../components/assets/bird-logo.png";
import NavigationBar from "../components/NavigationBar";

function Home() {
  return (
    <>
      <NavigationBar />
      <div className="logo-and-text">
        <img src={BirdLogo} alt="Logo" id="bird-logo" />
        <p>
          Welcome to Bird Encounters, a social platform where bird enthusiasts
          share their encounters with rare endemic European birds and provide
          information about these marvellous experiences. Become a part of this
          community and contribute to our unique archive of bird encounters.
        </p>
      </div>
    </>
  );
}

export default Home;
