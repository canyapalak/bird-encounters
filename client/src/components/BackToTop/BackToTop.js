import React from "react";
import "./BackToTop.css";
import UpIcon from "../assets/up-icon.png";

function BackToTop() {
  function scrollFunction() {
    const button = document.getElementById("up-icon");
    if (
      document.body.scrollTop > 120 ||
      document.documentElement.scrollTop > 120
    ) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }

  window.onscroll = () => scrollFunction();

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return <img src={UpIcon} id="up-icon" alt="Up" onClick={topFunction}></img>;
}

export default BackToTop;
