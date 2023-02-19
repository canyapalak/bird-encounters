import "./NewEncounterCard.css";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { useState, useEffect } from "react";

function NewEncounterCard() {
  const [newEncounter, setNewEncounter] = useState({});
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const now = new Date();

  const handleInputChange = (e) => {
    console.log("e.target.name, e.target.value", e.target.name, e.target.value);
    setNewEncounter({
      ...newEncounter,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitEncounter = async () => {
    console.log("newEncounter :>> ", newEncounter);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("title", newEncounter.title);
    urlencoded.append("species", newEncounter.species);
    urlencoded.append("province", newEncounter.province);
    urlencoded.append("country", newEncounter.country);
    urlencoded.append("experience", newEncounter.experience);
    urlencoded.append("time", now);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/encounters/postEncounter", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="newencounter-container">
      <Card className="newencounter-card">
        <span className="newencounter-title">
          <p>Title*: &nbsp;</p>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="signup-input"
            onChange={handleInputChange}
          />
        </span>
        <span className="newencounter-species">
          <p>Species*: &nbsp;</p>
          <input
            type="text"
            name="species"
            placeholder="Species"
            className="signup-input"
            onChange={handleInputChange}
          />
        </span>
        <span className="newencounter-province">
          <p>Province*: &nbsp;</p>
          <input
            type="text"
            name="province"
            placeholder="Province"
            className="signup-input"
            onChange={handleInputChange}
          />
        </span>
        <span className="newencounter-country">
          <p>Country*: &nbsp;</p>
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="signup-input"
            onChange={handleInputChange}
          />
        </span>
        <span className="newencounter-coordinates">
          <p>Coordinates*: &nbsp;</p>
          <button
            id="newencounter-choose-coordinates"
            // disabled={!selectedFile}
          >
            Choose
          </button>
        </span>
        <span className="newencounter-encounter-time">
          <p>Encounter Time: &nbsp;</p>
          {/* <input type="date" value={date} onChange={handleDateChange} />
          <input type="time" value={time} onChange={handleTimeChange} /> */}
        </span>
        <span className="newencounter-experience">
          <p>Experience*: &nbsp;</p>
          <textarea
            type="text"
            name="experience"
            placeholder="Type your experience here..."
            className="signup-input"
            onChange={handleInputChange}
          />
        </span>

        <hr />
        <span className="newencounter-upload-file">
          <form>
            <span className="upload-file">
              <p>Photo: &nbsp;</p>
              <input
                type="file"
                name="image"
                id="newencounter-upload"
                className="form-control"
                // onChange={handleAttachPhoto}
              />
            </span>
          </form>
          <button
            id="newencounter-upload-button"
            // onClick={handleSubmitPhoto}
            // disabled={!selectedFile}
          >
            Upload
          </button>
        </span>
        <span className="newencounter-upload-file">
          <form>
            <span className="upload-file">
              <p>Audio Record: &nbsp;</p>
              <input
                type="file"
                name="record"
                id="newencounter-upload"
                className="form-control"
                // onChange={handleAttachRecord}
              />
            </span>
          </form>
          <button
            id="newencounter-upload-file-button"
            // disabled={!selectedFile}
          >
            Upload
          </button>
        </span>

        <hr />
        <span className="required-fields">
          <p id="required-fields-text">*required fields</p>
        </span>

        <span className="signup-button">
          <button id="signup-button" onClick={handleSubmitEncounter}>
            Submit
          </button>
        </span>
      </Card>
    </div>
  );
}

export default NewEncounterCard;
