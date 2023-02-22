import "./EncounterCards.css";
import React, { useContext, useEffect, useState } from "react";
import { EncounterContext } from "../../store/EncounterContext";
import { AuthContext } from "../../store/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import BookmarkEmpty from "../../assets/bookmark-empty.png";
import BookmarkFilled from "../../assets/bookmark-filled.png";
import useConvertTime from "../../hooks/useConvertTime";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import BackToTop from "../BackToTop/BackToTop";

function EncounterCards() {
  const redirectTo = useNavigate();
  const convertTime = useConvertTime();
  const { encounters } = useContext(EncounterContext);
  const { isToken, currentUser } = useContext(AuthContext);
  const [isToggled, setIsToggled] = useState(false);
  const [sortingMethod, setSortingMethod] = useState("newest");
  const [showNewEncounterModal, setShowNewEncounterModal] = useState(false);
  const handleCloseNewEncounterModal = () => setShowNewEncounterModal(false);
  const handleShowNewEncounterModal = () => setShowNewEncounterModal(true);
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchedEncounters, setSearchedEncounters] = useState("");

  useEffect(() => {}, []);

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

  const sortedEncounters =
    encounters &&
    encounters.slice().sort((a, b) => {
      if (sortingMethod === "newest") {
        return new Date(b.posttime) - new Date(a.posttime);
      } else if (sortingMethod === "oldest") {
        return new Date(a.posttime) - new Date(b.posttime);
      } else if (sortingMethod === "favorites") {
        return b.favs - a.favs;
      } else if (sortingMethod === "species") {
        return a.species.localeCompare(b.species);
      } else if (sortingMethod === "country") {
        return a.country.localeCompare(b.country);
      }
    });

  function handleFavClick() {
    setIsToggled(!isToggled);
  }

  const encountersToRender = searchQuery
    ? searchedEncounters
    : sortedEncounters;

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
                  value="species"
                  onClick={() => handleSort("species")}
                >
                  Species
                </Dropdown.Item>
                <Dropdown.Item
                  value="country"
                  onClick={() => handleSort("country")}
                >
                  Country
                </Dropdown.Item>
                <Dropdown.Item
                  value="favorites"
                  onClick={() => handleSort("favorites")}
                >
                  Favourites
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
                        {convertTime(encounter.posttime)}
                      </p>
                    </span>
                  </div>
                  <div className="fav-icon-and-number">
                    <div onClick={handleFavClick} className="fav-icon">
                      {!isToggled ? (
                        <img src={BookmarkEmpty} alt="Not Fav" />
                      ) : (
                        <img src={BookmarkFilled} alt="Fav" />
                      )}
                    </div>
                    <span className="fav-number">
                      <p>{encounter.favs}</p>
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
