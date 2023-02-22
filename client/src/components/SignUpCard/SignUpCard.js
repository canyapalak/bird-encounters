import "./SignUpCard.css";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

function SignUpCard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newUser, setNewUser] = useState({});
  const redirectTo = useNavigate();
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
  const [isMailInUse, setisMailInUse] = useState(false);
  const [isUserNameEmpty, setisUserNameEmpty] = useState(false);
  const [isUserNameInUse, setIsUserNameInUse] = useState(false);
  const [isMailInvalid, setIsMailInvalid] = useState(false);
  const [isPasswordShort, setIsPasswordShort] = useState(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const [isUploadFail, setIsUploadFail] = useState(false);
  const [isFetchFail, setIsFetchFail] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [showPictureModal, setShowPictureModal] = useState(false);
  const handleClosePictureModal = () => setShowPictureModal(false);
  const handleShowPictureModal = () => setShowPictureModal(true);

  const AvatarPlaceholder =
    "https://res.cloudinary.com/djlyhp6vr/image/upload/v1676284633/bird-encounters/avatar-placeholder_yh3ock.png";

  function handleSignUpAndModal() {
    handleSignUp();
    handleShowModal();
  }

  function handleSubmitPictureAndModal() {
    handleSubmitPicture();
    handleShowPictureModal();
  }

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

  const handleSubmitPicture = async (e) => {
    setIsUploadSuccessful(false);
    setIsUploadFail(false);
    const formdata = new FormData();
    formdata.append("image", selectedFile);

    console.log("formData :>> ", formdata);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/imageUpload",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setNewUser({ ...newUser, userPicture: result.imageUrl });
      if (result.msg === "image upload ok") {
        setIsUploadSuccessful(true);
      }
    } catch (error) {
      console.log("error :>> ", error);
      setIsUploadFail(true);
    }
  };

  const handleSignUp = async () => {
    setIsSignUpSuccessful(false);
    setIsUserNameInUse(false);
    setisMailInUse(false);
    setIsMailInvalid(false);
    setIsPasswordShort(false);
    setIsFetchFail(false);

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
        if (result.msg === "this username is already in use") {
          setIsUserNameInUse(true);
        }
        if (result.msg === "this email address is already in use") {
          setisMailInUse(true);
        }
        if (result.msg === "email address is invalid") {
          setIsMailInvalid(true);
        }
        if (result.msg === "password should be at least 6 characters") {
          setIsPasswordShort(true);
        }
        if (result.msg === "username can not be empty") {
          setisUserNameEmpty(true);
        }
        if (result.msg === "error during signup") {
          setIsFetchFail(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setIsFetchFail(true);
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
        <button
          onClick={handleSubmitPictureAndModal}
          id="upload-button"
          disabled={!selectedFile}
        >
          Upload
        </button>
        <span className="signup-button">
          <Modal show={showPictureModal} className="signup-modal">
            <Modal.Body>
              {isUploadSuccessful && (
                <p>You have successfully uploaded your picture.</p>
              )}
              {isUploadFail && (
                <p id="error-message">Please upload a jpg, jpeg or png file.</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                className="signup-modal-button"
                onClick={handleClosePictureModal}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </span>

        <hr />
        <span className="required-fields">
          <p id="required-fields-text">*required fields</p>
        </span>

        <span className="signup-button">
          <button onClick={handleSignUpAndModal} id="signup-button">
            Sign Up
          </button>
          <Modal show={showModal} className="signup-modal">
            <Modal.Body>
              {isSignUpSuccessful && (
                <p>You have successfully signed up. Please log in.</p>
              )}
              {isMailInUse && (
                <p id="error-message">
                  This e-mail address is in use. Try another one.
                </p>
              )}
              {isUserNameInUse && (
                <p id="error-message">
                  This username is in use. Username should be unique.
                </p>
              )}
              {isUserNameEmpty && (
                <p id="error-message">Please type a username.</p>
              )}
              {isMailInvalid && (
                <p id="error-message">
                  E-mail address is invalid. Please check it.
                </p>
              )}
              {isPasswordShort && (
                <p id="error-message">
                  Password should be at least 6 characters.
                </p>
              )}
              {isFetchFail && (
                <p id="error-message">
                  Something went wrong. Please try again.
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              {isSignUpSuccessful && (
                <Button
                  variant="primary"
                  className="signup-modal-button"
                  onClick={() => redirectTo("/login")}
                >
                  Close
                </Button>
              )}
              {isMailInUse ||
              isUserNameInUse ||
              isMailInvalid ||
              isPasswordShort ||
              isUserNameEmpty ||
              isFetchFail ? (
                <Button
                  variant="primary"
                  className="signup-modal-button"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              ) : null}
            </Modal.Footer>
          </Modal>
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
