import "./LogInCard.css";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

function LogInCard() {
  return (
    <div className="login-container">
      <Card className="login-card">
        <span className="login-email">
          <p>E-mail Address: &nbsp;</p>
          <input
            type="text"
            placeholder="E-mail Address"
            className="signup-input"
            // onChange={handleRegisterEmailChange}
            autoComplete="email"
          />
        </span>
        <span className="login-password">
          <p>Password: &nbsp;</p>
          <input
            type="text"
            placeholder="Password"
            className="password-input"
            // onChange={handleRegisterEmailChange}
            autoComplete="username"
          />
        </span>
        <hr />
        <span className="experience">
          <button
            // onClick={handleLogin}
            id="login-button"
          >
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
