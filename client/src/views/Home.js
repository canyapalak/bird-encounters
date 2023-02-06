import "./styles/Home.css";
import LandingImg from "../components/assets/landing.png";
import NavigationBar from "../components/NavigationBar";

function Home() {
  return (
    <>
      <NavigationBar />
      <div className="landing-img">
        <img src={LandingImg} alt="Bird House" id="bird-house" />
      </div>
    </>
  );
}

export default Home;
