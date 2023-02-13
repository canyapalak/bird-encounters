import "./SignUpCard.css";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function SignUpCard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  const redirectTo = useNavigate();
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(null);
  const [isMailInUse, setisMailInUse] = useState(null);
  const AvatarPlaceholder =
    "https://res.cloudinary.com/djlyhp6vr/image/upload/v1676284633/bird-encounters/avatar-placeholder_yh3ock.png";

  const handleAttachPicture = (e) => {
    e.preventDefault();
    console.log("e.target :>> ", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    console.log("e.target.name, e.target.value", e.target.name, e.target.value);
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = () => {
    // Submit the picture
    // const submitPicture = () => {
    const formdata = new FormData();
    formdata.append("userPicture", selectedFile);
    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://localhost:5000/api/users/imageUpload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        setNewUser({ ...newUser, userPicture: result.userPicture });
        submitUserData();
      })
      .catch((error) => console.log("error", error));
    // };

    // Submit user data after the picture has been uploaded

    // submitPicture();
  };
  const submitUserData = () => {
    console.log("newUser :>> ", newUser);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("password", newUser.password);
    urlencoded.append("email", newUser.email);
    urlencoded.append("userName", newUser.userName);
    urlencoded.append(
      "userPicture",
      newUser.userPicture ? newUser.userPicture : AvatarPlaceholder
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/users/signup", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.msg === "signup successful") {
          setIsSignUpSuccessful(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
        if (error.msg.includes("in use")) {
          setisMailInUse(true);
        }
      });
  };

  return (
    <div className="signup-container">
      <Card className="signup-card">
        <span className="signup-username">
          <p>Username*: &nbsp;</p>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            className="signup-input"
            onChange={handleInputChange}
          />
        </span>
        <span className="signup-email">
          <p>E-mail Address*: &nbsp;</p>
          <input
            type="text"
            name="email"
            placeholder="E-mail Address"
            className="signup-input"
            onChange={handleInputChange}
          />
        </span>

        <span className="signup-password">
          <p>Password*: &nbsp;</p>
          <input
            type="text"
            name="password"
            placeholder="Password"
            className="password-input"
            onChange={handleInputChange}
          />
        </span>
        <form>
          <span className="signup-avatar">
            <p>Profile Picture: &nbsp;</p>
            <input
              type="file"
              name="userPicture"
              id="upload-image"
              className="form-control"
              onChange={handleAttachPicture}
            />
          </span>
        </form>

        <hr />
        <span className="required-fields">
          <p id="required-fields-text">*required fields</p>
        </span>

        <span className="signup-button">
          <button onClick={handleSignUp} id="signup-button">
            Sign Up
          </button>
        </span>
        <span className="go-to-login">
          <p>
            You already have an account? Go to&nbsp;
            <a href="/login">Log In</a>&nbsp;page.
          </p>
        </span>
      </Card>
    </div>
  );
}

export default SignUpCard;
