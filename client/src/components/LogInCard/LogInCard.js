import "./LogInCard.css";
import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../store/AuthContext";

function LogInCard() {
  const [logInUser, setLogInUser] = useState({});
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  console.log("currentUser :>> ", currentUser);

  const handleInputChange = (e) => {
    setLogInUser({
      ...logInUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogIn = () => {
    console.log("loginuser :>> ", logInUser);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", logInUser.email);
    urlencoded.append("password", logInUser.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/users/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.token) {
          localStorage.setItem("token", result.token);
          setCurrentUser(result.user);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // useEffect(() => {
  //   console.log("logInUser", logInUser);
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     console.log("you are logged in");
  //   } else {
  //     console.log("you are NOT logged in");
  //   }
  // }, [logInUser]);

  return (
    <div className="login-container">
      <Card className="login-card">
        <span className="login-email">
          <p>E-mail Address: &nbsp;</p>
          <input
            type="email"
            name="email"
            placeholder="E-mail Address"
            className="signup-input"
            onChange={handleInputChange}
          />
        </span>
        <span className="login-password">
          <p>Password: &nbsp;</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="password-input"
            onChange={handleInputChange}
          />
        </span>
        <hr />
        <span className="experience">
          <button onClick={handleLogIn} id="login-button">
            Log In
          </button>
        </span>
        <span className="go-to-login">
          <p>
            You don't have an account? Go to&nbsp;
            <a href="/signup">Sign Up</a>&nbsp;page.
          </p>
        </span>
      </Card>
    </div>
  );
}

export default LogInCard;
