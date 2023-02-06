import "../components/styles/NavigationBar.css";

function NavigationBar() {
  return (
    <>
      <header className="header">
        <a href="https://www.google.com" className="logo">
          bird encounters
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" for="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          <li>
            <a href="https://www.google.com">Encounters</a>
          </li>
          <li>
            <a href="https://www.google.com">Log In</a>
          </li>
          <li>
            <a href="https://www.google.com">Sign Up</a>
          </li>
        </ul>
      </header>
    </>
  );
}

export default NavigationBar;
