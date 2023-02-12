import "./SignUpCard.css";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

function SignUpCard() {
  return (
    <div className="signup-container">
      <Card className="signup-card">
        <span className="signup-username">
          <p>Username*: &nbsp;</p>
          <input
            type="text"
            placeholder="Username"
            className="signup-input"
            // onChange={handleRegisterEmailChange}
            autoComplete="username"
          />
        </span>
        <span className="signup-email">
          <p>E-mail Address*: &nbsp;</p>
          <input
            type="text"
            placeholder="E-mail Address"
            className="signup-input"
            // onChange={handleRegisterEmailChange}
            autoComplete="email"
          />
        </span>

        <span className="signup-password">
          <p>Password*: &nbsp;</p>
          <input
            type="text"
            placeholder="Password"
            className="password-input"
            // onChange={handleRegisterEmailChange}
            autoComplete="password"
          />
        </span>
        <span className="signup-avatar">
          <p>Profile Picture: &nbsp;</p>
          <input
            type="file"
            className="form-control"
            id="upload-image"
            // onChange={handleImageInput}
          />
        </span>
        <hr />
        <span className="required-fields">
          <p id="required-fields-text">*required fields</p>
        </span>

        <span className="signup-button">
          <button
            // onClick={handleLogin}
            id="signup-button"
          >
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
