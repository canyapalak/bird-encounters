import BirdLogo from "./components/assets/bird-logo.png";

function App() {
  return (
    <div className="App">
      <div className="logo-and-text">
        <img src={BirdLogo} alt="Logo" id="bird-logo" />
        <p>
          Welcome to Bird Encounters, a social platform where bird enthusiasts
          share their encounters with rare endemic European birds and provide
          information about these marvellous experiences. Become a part of this
          community and contribute to our unique archive of bird encounters.
        </p>
      </div>
    </div>
  );
}

export default App;
