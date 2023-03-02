import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import "./NavigationBar.css";

function NavigationBar() {
  const { isToken, logOut, isLogInSuccessful } = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <>
      <header className="nav-bar">
        <Link to={"/"}>
          <p className="logo">bird encounters</p>
        </Link>

        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          <li>
            <Link to={"/encounters"}>encounters</Link>
          </li>
          <li>
            <Link to={"/map"}>map</Link>
          </li>
          {isToken || isLogInSuccessful ? (
            <li>
              <Link to={"/profile"}>profile</Link>
            </li>
          ) : (
            <li>
              <Link to={"/signup"}>sign up</Link>
            </li>
          )}
          {isToken || isLogInSuccessful ? (
            <li>
              <a href="/" id="logout-link" onClick={logOut}>
                log out
              </a>
            </li>
          ) : (
            <li>
              <Link to={"/login"}>log in</Link>
            </li>
          )}
        </ul>
      </header>
    </>
  );
}

export default NavigationBar;
