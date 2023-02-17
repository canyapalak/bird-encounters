import "./NewEncounterCard.css";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";

function NewEncounterCard() {
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
          />
        </span>
        <span className="newencounter-species">
          <p>Species*: &nbsp;</p>
          <input
            type="text"
            name="species"
            placeholder="Species"
            className="signup-input"
          />
        </span>
        <span className="newencounter-area">
          <p>Area*: &nbsp;</p>
          <input
            type="text"
            name="area"
            placeholder="Area"
            className="signup-input"
          />
        </span>
        <span className="newencounter-province">
          <p>Province*: &nbsp;</p>
          <input
            type="text"
            name="province"
            placeholder="Province"
            className="signup-input"
          />
        </span>
        <span className="newencounter-country">
          <p>Country*: &nbsp;</p>
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="signup-input"
          />
        </span>
        <span className="newencounter-coordinates">
          <p>Coordinates*: &nbsp;</p>
          <span className="two-coordinates">
            <input
              type="number"
              name="latitude"
              placeholder="Latitude"
              className="signup-input"
            />
            &nbsp;-&nbsp;
            <input
              type="number"
              name="longitude"
              placeholder="Longitude"
              className="signup-input"
            />
          </span>
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
            placeholder="Experience"
            className="signup-input"
          />
        </span>

        <hr />
        <span className="newencounter-upload-file">
          <form>
            <span className="upload-image">
              <p>Photo: &nbsp;</p>
              <input
                type="file"
                name="image"
                id="upload-image"
                className="form-control"
              />
            </span>
          </form>
          <button
            id="upload-button"
            // disabled={!selectedFile}
          >
            Upload
          </button>
        </span>
        <span className="newencounter-upload-file">
          <form>
            <span className="upload-record">
              <p>Audio Record: &nbsp;</p>
              <input
                type="file"
                name="record"
                id="upload-image"
                className="form-control"
              />
            </span>
          </form>
          <button
            id="upload-button"
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
          <button id="signup-button">Submit</button>
        </span>
      </Card>
    </div>
  );
}

export default NewEncounterCard;
