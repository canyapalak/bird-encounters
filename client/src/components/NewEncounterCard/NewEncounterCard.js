import "./NewEncounterCard.css";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";

function NewEncounterCard() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [newEncounter, setNewEncounter] = useState({});

  const EncounterPlaceholder =
    "https://res.cloudinary.com/djlyhp6vr/image/upload/v1676672744/bird-encounters/encounter-placeholder_pjoc9a.png";

  const [formData, setFormData] = useState({
    title: "",
    species: "",
    province: "",
    country: "",
    latitude: 0,
    longitude: 0,
    experience: "",
    time: "",
    image: null,
    record: null,
  });

  const handleFormChange = (event) => {
    const target = event.target;
    const value = target.type === "file" ? target.files[0] : target.value;
    const name = target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitEncounter = async (event) => {
    event.preventDefault();
    const {
      title,
      species,
      province,
      country,
      latitude,
      longitude,
      experience,
      time,
      image,
      record,
    } = formData;

    const data = new FormData();
    data.append("title", title);
    data.append("species", species);
    data.append("province", province);
    data.append("country", country);
    data.append("latitude", latitude);
    data.append("longitude", longitude);
    data.append("experience", experience);
    data.append("time", time);
    data.append("image", image);
    data.append("record", record);

    try {
      const response = await fetch(
        "http://localhost:5000/api/encounters/postEncounter",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAttachPhoto = (e) => {
    e.preventDefault();
    console.log("e.target :>> ", e.target.files[0]);
    setSelectedPhoto(e.target.files[0]);
  };

  const handleSubmitPhoto = async (e) => {
    const formdata = new FormData();
    formdata.append("image", selectedPhoto);

    console.log("formData :>> ", formdata);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/imageUploadEncounter",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setNewEncounter({ ...newEncounter, image: result.imageUrl });
      if (result.msg === "image upload ok") {
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleAttachRecord = (e) => {
    e.preventDefault();
    console.log("e.target :>> ", e.target.files[0]);
    setSelectedRecord(e.target.files[0]);
  };

  const handleSubmitRecord = async (e) => {
    const formdata = new FormData();
    formdata.append("image", selectedPhoto);

    console.log("formData :>> ", formdata);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/imageUploadEncounter",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setNewEncounter({ ...newEncounter, record: result.recordUrl });
      if (result.msg === "audio file upload ok") {
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
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
            onChange={handleFormChange}
          />
        </span>
        <span className="newencounter-species">
          <p>Species*: &nbsp;</p>
          <input
            type="text"
            name="species"
            placeholder="Species"
            className="signup-input"
            onChange={handleFormChange}
          />
        </span>
        <span className="newencounter-province">
          <p>Province*: &nbsp;</p>
          <input
            type="text"
            name="province"
            placeholder="Province"
            className="signup-input"
            onChange={handleFormChange}
          />
        </span>
        <span className="newencounter-country">
          <p>Country*: &nbsp;</p>
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="signup-input"
            onChange={handleFormChange}
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
          <input
            type="datetime-local"
            name="time"
            placeholder="Encounter Time"
            className="signup-input"
          />
        </span>
        <span className="newencounter-experience">
          <p>Experience*: &nbsp;</p>
          <textarea
            type="text"
            name="experience"
            placeholder="Type your experience here..."
            className="signup-input"
            onChange={handleFormChange}
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
                onChange={handleAttachPhoto}
              />
            </span>
          </form>
          <button
            id="newencounter-upload-button"
            onClick={handleSubmitPhoto}
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
                onChange={handleAttachRecord}
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
