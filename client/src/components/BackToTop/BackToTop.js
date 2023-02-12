import React, { useEffect } from "react";
import "./BackToTop.css";
import UpIcon from "../../assets/up-icon.png";

function BackToTop() {
  useEffect(() => {
    const button = document.getElementById("up-icon");
    if (button) {
      window.onscroll = () => {
        if (
          document.body.scrollTop > 120 ||
          document.documentElement.scrollTop > 120
        ) {
          button.style.display = "block";
        } else {
          button.style.display = "none";
        }
      };
    }
  }, []);

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return <img src={UpIcon} id="up-icon" alt="Up" onClick={topFunction} />;
}

export default BackToTop;
