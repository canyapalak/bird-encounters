import "./Home.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

function Home() {
  return (
    <>
      <>
        <NavigationBar />
      </>

      <div className="home-container">
        <span>
          <p>
            Welcome to Bird Encounters, a social platform where bird enthusiasts
            share their encounters with rare endemic European birds and record
            information about these marvellous experiences...
          </p>
        </span>
        <span></span>
        <span></span>
      </div>
    </>
  );
}

export default Home;
