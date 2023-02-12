import "./SignUpCard.css";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import AvatarPlaceholder from "../../assets/avatar-placeholder.png";

function SignUpCard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});

  // const handleAttachPicture = (e) => {
  //   // console.log("e.target :>> ", e);
  //   setSelectedFile(e.target.files[0]);
  // };
  // const submitPicture = (e) => {
  //   e.preventDefault();
  //   const formdata = new FormData();
  //   formdata.append("image", selectedFile);

  //   const requestOptions = {
  //     method: "POST",
  //     body: formdata,
  //   };

  //   fetch("http://localhost:5001/api/users/imageUpload", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("result", result);
  //       setNewUser({ ...newUser, userPicture: result.userPicture });
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  const handleInputChange = (e) => {
    console.log("e.target.name, e.target.value", e.target.name, e.target.value);
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("password", newUser.password);
    urlencoded.append("email", newUser.email);
    urlencoded.append("userName", newUser.userName);
    urlencoded.append(
      "userPicture",
      newUser.userPicture ? newUser.userPicture : null
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/users/signup", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
            autoComplete="username"
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
            autoComplete="email"
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
            autoComplete="password"
          />
        </span>
        <span className="signup-avatar">
          <p>Profile Picture: &nbsp;</p>
          <input
            type="file"
            name="userPicture"
            className="form-control"
            id="upload-image"
            // onChange={handleAttachPicture}
          />
        </span>
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
