import "./NavigationBar.css";

function NavigationBar() {
  return (
    <>
      <header className="nav-bar">
        <a href="/" className="logo">
          bird encounters
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          <li>
            <a href="/encounters">encounters</a>
          </li>
          <li>
            <a href="/map">map</a>
          </li>
          <li>
            <a href="https://www.google.com">log in</a>
          </li>
          <li>
            <a href="https://www.google.com">sign up</a>
          </li>
        </ul>
      </header>
    </>
  );
}

export default NavigationBar;
