import "./EncounterCards.css";
import React, { useContext, useEffect, useState } from "react";
import { EncounterContext } from "../../store/EncounterContext";
import { AuthContext } from "../../store/AuthContext";
import { Link } from "react-router-dom";
import useConvertDateOnly from "../../hooks/useConvertDateOnly";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import BookmarkEmpty from "../../assets/bookmark-empty.png";
import BookmarkFilled from "../../assets/bookmark-filled.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import BackToTop from "../BackToTop/BackToTop";
import { getToken } from "../../utils/getToken";

function EncounterCards() {
  const convertDate = useConvertDateOnly();
  const { encounters, isToggled, setIsToggled } = useContext(EncounterContext);
  const { isToken, userProfile, getProfile } = useContext(AuthContext);
  const [sortingMethod, setSortingMethod] = useState("newest");
  const [showNewEncounterModal, setShowNewEncounterModal] = useState(false);
  const handleCloseNewEncounterModal = () => setShowNewEncounterModal(false);
  const handleShowNewEncounterModal = () => setShowNewEncounterModal(true);
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchedEncounters, setSearchedEncounters] = useState("");

  useEffect(() => {
    getProfile();
  }, [encounters, isToggled]);

  const handleSearchQuery = (event) => {
    const searchTerm = event.target.value;
    console.log("searchTerm", searchTerm);
    setSearchQuery(searchTerm);
    const searchedEncounters = encounters.filter((encounter) =>
      encounter.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedEncounters(searchedEncounters);
  };

  function handleSort(value) {
    setSortingMethod(value);
  }

  //sorting with dropdown
  const sortedEncounters =
    encounters &&
    encounters.slice().sort((a, b) => {
      if (sortingMethod === "newest") {
        return new Date(b.posttime) - new Date(a.posttime);
      } else if (sortingMethod === "oldest") {
        return new Date(a.posttime) - new Date(b.posttime);
      } else if (sortingMethod === "favorites") {
        return b.favs.length - a.favs.length;
      } else if (sortingMethod === "species") {
        return a.species.localeCompare(b.species);
      } else if (sortingMethod === "country") {
        return a.country.localeCompare(b.country);
      } else if (sortingMethod === "comments") {
        return b.comments.length - a.comments.length;
      }
    });

  const encountersToRender = searchQuery
    ? searchedEncounters
    : sortedEncounters;

  // const isFav = (cardFavArray, userId) => {
  //   return cardFavArray.includes(userId) ? true : false;
  // };

  //add an encounter to favorites
  const handleFavClick = async (event, encounter) => {
    event.stopPropagation();

    const encounterId = encounter._id;
    const userId = userProfile._id;
    const token = getToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("encounterId", encounterId);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      fetch(
        "http://localhost:5000/api/encounters/addFavourites",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log("result :>> ", result);
          setIsToggled(!isToggled);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  //remove an encounter from favorites
  const handleFavUnclick = async (event, encounter) => {
    event.stopPropagation();

    const encounterId = encounter._id;
    const userId = userProfile._id;
    const token = getToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("encounterId", encounterId);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      fetch(
        "http://localhost:5000/api/encounters/removeFavourites",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log("result :>> ", result);
          setIsToggled(!isToggled);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="panel-and-container">
      <div className="panel">
        <span className="dropdown-and-new">
          <span className="dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-toggle">
                Sort By
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  value="newest"
                  onClick={() => handleSort("newest")}
                >
                  Newest
                </Dropdown.Item>
                <Dropdown.Item
                  value="oldest"
                  onClick={() => handleSort("oldest")}
                >
                  Oldest
                </Dropdown.Item>
                <Dropdown.Item
                  value="comments"
                  onClick={() => handleSort("comments")}
                >
                  Most Commented
                </Dropdown.Item>
                <Dropdown.Item
                  value="favorites"
                  onClick={() => handleSort("favorites")}
                >
                  Most Favourited
                </Dropdown.Item>
                <Dropdown.Item
                  value="species"
                  onClick={() => handleSort("species")}
                >
                  Species Name
                </Dropdown.Item>
                <Dropdown.Item
                  value="country"
                  onClick={() => handleSort("country")}
                >
                  Country Name
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </span>
          <span className="new-post">
            {" "}
            {isToken ? (
              <Link to={"/newencounter"}>
                <button id="new-post-button">+ New Encounter </button>
              </Link>
            ) : (
              <>
                <button
                  id="new-post-button"
                  onClick={handleShowNewEncounterModal}
                >
                  + New Encounter
                </button>
                <Modal show={showNewEncounterModal} className="signup-modal">
                  <Modal.Body>
                    <p id="error-message">
                      You need to log in first to post a new encounter.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      className="signup-modal-button"
                      onClick={handleCloseNewEncounterModal}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </span>
        </span>
        <span className="search-input">
          <input
            type="text"
            onChange={handleSearchQuery}
            placeholder="Search by title"
          />
        </span>
      </div>
      <hr id="line"></hr>
      <div className="cards-container">
        {encountersToRender && encountersToRender.length === 0 && (
          <p>No encounters found.</p>
        )}
        {encountersToRender &&
          encountersToRender.map((encounter, index) => {
            return (
              <Card className="one-card" key={index}>
                <span className="post-image">
                  <img src={encounter.image} alt="Encounter Image" />
                </span>
                <span className="title">
                  <p>{encounter.title}</p>
                </span>
                <hr />
                <div className="username-and-favs">
                  <div className="username-and-time">
                    <span className="username">
                      <p id="posted-by">posted by&nbsp;</p>
                      <p id="username-text">{encounter.userName}</p>
                    </span>
                    <span className="post-time">
                      <p id="posted-by">on&nbsp;</p>
                      <p id="post-time-text">
                        {convertDate(encounter.posttime)}
                      </p>
                    </span>
                  </div>
                  <div className="fav-icon-and-number">
                    {!encounter.favs.includes(userProfile._id) ? (
                      <div
                        onClick={(event) => handleFavClick(event, encounter)}
                        className="fav-icon"
                      >
                        <img src={BookmarkEmpty} alt="Not Fav" />
                      </div>
                    ) : (
                      <div
                        onClick={(event) => handleFavUnclick(event, encounter)}
                        className="fav-icon"
                      >
                        <img src={BookmarkFilled} alt="Not Fav" />
                      </div>
                    )}
                    <span className="fav-number">
                      <p>{encounter.favs.length}</p>
                    </span>
                  </div>
                </div>
                <hr />

                <Link to={"/" + encounter._id}>
                  <button id="card-button">Details</button>{" "}
                </Link>
              </Card>
            );
          })}
      </div>{" "}
      {encountersToRender && encountersToRender.length >= 6 && <BackToTop />}
    </div>
  );
}

export default EncounterCards;
