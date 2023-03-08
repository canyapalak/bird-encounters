import "./LogInCard.css";
import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

function LogInCard() {
  const {
    currentUser,
    handleLogIn,
    handleInputChange,
    isEmailWrong,
    isPasswordWrong,
    isLogInSuccessful,
  } = useContext(AuthContext);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const handleCloseLogInModal = () => setShowLogInModal(false);
  const handleShowLogInModal = () => setShowLogInModal(true);
  const redirectTo = useNavigate();

  // console.log("currentUser :>> ", currentUser);

  function handleLogInAndModal() {
    handleLogIn();
    handleShowLogInModal();
  }

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
          <button onClick={handleLogInAndModal} id="login-button">
            Log In
          </button>

          <span className="signup-button">
            <Modal show={showLogInModal} className="signup-modal">
              <Modal.Body>
                {isLogInSuccessful && (
                  <p>
                    Welcome, {currentUser.userName}. You have successfully
                    logged in.
                  </p>
                )}
                {isPasswordWrong && (
                  <p id="error-message">Password is wrong.</p>
                )}
                {isEmailWrong && (
                  <p id="error-message">E-mail address is wrong.</p>
                )}
              </Modal.Body>
              <Modal.Footer>
                {isLogInSuccessful ? (
                  <Button
                    variant="primary"
                    className="signup-modal-button"
                    onClick={() => redirectTo("/")}
                  >
                    Close
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="signup-modal-button"
                    onClick={handleCloseLogInModal}
                  >
                    Close
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          </span>
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
