import { useContext, useEffect } from "react";
import { AuthContext } from "../../store/AuthContext";
import "./NavigationBar.css";

function NavigationBar() {
  const { isToken, logOut } = useContext(AuthContext);

  useEffect(() => {}, [isToken]);

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
          {isToken ? (
            <li>
              <a href="/profile">profile</a>
            </li>
          ) : (
            <li>
              <a href="/signup">sign up</a>
            </li>
          )}
          {isToken ? (
            <li>
              <a href="/" id="logout-link" onClick={logOut}>
                log out
              </a>
            </li>
          ) : (
            <li>
              <a href="/login">log in</a>
            </li>
          )}
        </ul>
      </header>
    </>
  );
}

export default NavigationBar;
