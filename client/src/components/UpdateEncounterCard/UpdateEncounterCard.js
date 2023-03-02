import "./UpdateEncounterCard.css";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewEncounterMapModal from "../NewEncounterMapModal/NewEncounterMapModal";
import { getToken } from "../../utils/getToken.js";
import { AuthContext } from "../../store/AuthContext";
import { EncounterContext } from "../../store/EncounterContext";

function UpdateEncounterCard(props) {
  const { setIsEditing, isEditing } = props;
  const { currentUser } = useContext(AuthContext);
  const { setBackToEncountersWithUpdate } = useContext(EncounterContext);
  const redirectTo = useNavigate();
  const { _id } = useParams();
  const [encounterToUpdate, setEncounterToUpdate] = useState();
  const [encounterToUpdateError, setEncounterToUpdateError] = useState();
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isImageUploadSuccessful, setIsImageUploadSuccessful] = useState(false);
  const [isImageUploadFail, setIsImageUploadFail] = useState(false);
  const [selectedAudioFile, setSelectedAudioFile] = useState(null);
  const [isAudioUploadSuccessful, setIsAudioUploadSuccessful] = useState(false);
  const [isAudioUploadFail, setIsAudioUploadFail] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [isUpdateFail, setIsUpdateFail] = useState(false);
  const [isMissingFields, setIsMissingFields] = useState(false);
  const [showPictureModal, setShowPictureModal] = useState(false);
  const handleClosePictureModal = () => setShowPictureModal(false);
  const handleShowPictureModal = () => setShowPictureModal(true);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const handleCloseAudioModal = () => setShowAudioModal(false);
  const handleShowAudioModal = () => setShowAudioModal(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const [showNewEncounterMap, setShowNewEncounterMap] = useState(false);
  const handleShowNewEncounterMap = () => setShowNewEncounterMap(true);
  const handleCloseNewEncounterMap = () => setShowNewEncounterMap(false);
  const [encounterPosition, setEncounterPosition] = useState(null);
  const [updateEncounterPosition, setUpdateEncounterPosition] = useState(null);

  function backToEncountersWhenSuccessful() {
    redirectTo("/encounters");
    setBackToEncountersWithUpdate(true);
  }

  function cropAndString(e) {
    return parseFloat(e).toFixed(6).toString();
  }

  const updatedLat =
    updateEncounterPosition && cropAndString(updateEncounterPosition.lat);
  const updatedLng =
    updateEncounterPosition && cropAndString(updateEncounterPosition.lng);

  useEffect(() => {
    const fetchEncounterById = async () => {
      try {
        const urlFetchEncounterById = `http://localhost:5000/api/encounters/${_id}`;
        const response = await fetch(urlFetchEncounterById);
        const results = await response.json();

        setEncounterToUpdate(results.requestedId[0]);
      } catch (error) {
        console.log("error", error);
        setEncounterToUpdateError(error);
      }
    };

    fetchEncounterById();
  }, []);

  const handleInputChange = (e) => {
    console.log("e.target.name, e.target.value", e.target.name, e.target.value);
    setEncounterToUpdate({
      ...encounterToUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleAttachPicture = (e) => {
    e.preventDefault();
    console.log("e.target :>> ", e.target.files[0]);
    setSelectedImageFile(e.target.files[0]);
  };

  const handleAttachAudio = (e) => {
    e.preventDefault();
    console.log("e.target :>> ", e.target.files[0]);
    setSelectedAudioFile(e.target.files[0]);
  };

  function handleSubmitPictureAndModal() {
    handleSubmitPicture();
    handleShowPictureModal();
  }

  function handleSubmitAudioAndModal() {
    handleSubmitAudio();
    handleShowAudioModal();
  }

  function handleUpdateEncounterAndModal() {
    handleSubmitEncounter();
    handleShowUpdateModal();
  }

  //add image for encounter
  const handleSubmitPicture = async (e) => {
    setIsImageUploadSuccessful(false);
    setIsImageUploadFail(false);
    const formdata = new FormData();
    formdata.append("image", selectedImageFile);
    console.log("formData :>> ", formdata);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/encounters/imageUploadEncounter",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setEncounterToUpdate({ ...encounterToUpdate, image: result.imageUrl });
      if (result.msg === "image upload ok") {
        setIsImageUploadSuccessful(true);
      }
    } catch (error) {
      console.log("error :>> ", error);
      setIsImageUploadFail(true);
    }
  };

  //add record for encounter
  const handleSubmitAudio = async (e) => {
    setIsAudioUploadSuccessful(false);
    setIsAudioUploadFail(false);
    const token = getToken();
    const formdata = new FormData();
    formdata.append("record", selectedAudioFile);

    console.log("formData :>> ", formdata);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/encounters/audioUpload",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setEncounterToUpdate({ ...encounterToUpdate, record: result.recordUrl });
      if (result.msg === "audio upload ok") {
        setIsAudioUploadSuccessful(true);
      }
    } catch (error) {
      console.log("error :>> ", error);
      setIsAudioUploadFail(true);
    }
  };

  //update encounter
  const handleSubmitEncounter = async () => {
    setBackToEncountersWithUpdate(false);
    setIsMissingFields(false);
    setIsUpdateSuccessful(false);
    setIsUpdateFail(false);
    const myHeaders = new Headers();
    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("title", encounterToUpdate.title);
    urlencoded.append("species", encounterToUpdate.species);
    urlencoded.append("province", encounterToUpdate.province);
    urlencoded.append("country", encounterToUpdate.country);
    if (
      updatedLat !== null &&
      updatedLat !== "null" &&
      updatedLat !== undefined
    ) {
      urlencoded.append("latitude", updatedLat);
      urlencoded.append("longitude", updatedLng);
    }

    urlencoded.append("experience", encounterToUpdate.experience);
    urlencoded.append("time", encounterToUpdate.time);
    urlencoded.append("image", encounterToUpdate.image);
    urlencoded.append("record", encounterToUpdate.record);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      `http://localhost:5000/api/encounters/updateEncounter/${_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.msg === "Encounter updated successfully") {
          setIsUpdateSuccessful(true);
        }
        if (result.msg === "missing fields") {
          setIsMissingFields(true);
        }
        if (result.msg === "error during posting") {
          setIsUpdateFail(true);
        }
      })
      .catch((error) => {
        setIsUpdateFail(true);
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
            value={encounterToUpdate && encounterToUpdate.title}
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
            value={encounterToUpdate && encounterToUpdate.species}
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
            value={encounterToUpdate && encounterToUpdate.province}
            placeholder="Province"
            className="signup-input"
            onChange={handleInputChange}
            required
          />
        </span>
        <span className="newencounter-country">
          <p>Country*: &nbsp;</p>
          <input
            type="text"
            name="country"
            value={encounterToUpdate && encounterToUpdate.country}
            placeholder="Country"
            className="signup-input"
            onChange={handleInputChange}
            required
          />
        </span>
        <span className="newencounter-coordinates">
          <p>Coordinates*: &nbsp;</p>
          <button
            id="newencounter-choose-coordinates"
            onClick={handleShowNewEncounterMap}
          >
            Choose
          </button>
          <span className="old-coordinates">
            <p>{encounterToUpdate && encounterToUpdate.latitude}</p>
            <p>{encounterToUpdate && encounterToUpdate.longitude}</p>
          </span>
          <NewEncounterMapModal
            showNewEncounterMap={showNewEncounterMap}
            handleCloseNewEncounterMap={handleCloseNewEncounterMap}
            updateEncounterPosition={updateEncounterPosition}
            setUpdateEncounterPosition={setUpdateEncounterPosition}
            isEditing={isEditing}
            encounterToUpdate={encounterToUpdate}
          />
        </span>
        <span className="newencounter-encounter-time">
          <p>Encounter Time*: &nbsp;</p>
          <input
            type="datetime-local"
            name="time"
            id="time"
            onChange={handleInputChange}
          />
        </span>
        <span className="newencounter-experience">
          <p>Experience*: &nbsp;</p>
          <textarea
            type="text"
            name="experience"
            value={encounterToUpdate && encounterToUpdate.experience}
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
                onChange={handleAttachPicture}
              />
            </span>
          </form>
          <button
            id="newencounter-upload-button"
            onClick={handleSubmitPictureAndModal}
            disabled={!selectedImageFile}
          >
            Upload
          </button>
          <span className="signup-button">
            <Modal show={showPictureModal} className="signup-modal">
              <Modal.Body>
                {isImageUploadSuccessful && (
                  <p>You have successfully uploaded your picture.</p>
                )}
                {isImageUploadFail && (
                  <p id="error-message">
                    Please upload a jpg, jpeg or png file.
                  </p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  className="signup-modal-button"
                  onClick={handleClosePictureModal}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </span>
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
                onChange={handleAttachAudio}
              />
            </span>
          </form>
          <button
            id="newencounter-upload-file-button"
            disabled={!selectedAudioFile}
            onClick={handleSubmitAudioAndModal}
          >
            Upload
          </button>
          <span className="signup-button">
            <Modal show={showAudioModal} className="signup-modal">
              <Modal.Body>
                {isAudioUploadSuccessful && (
                  <p>You have successfully uploaded your record.</p>
                )}
                {isAudioUploadFail && (
                  <p id="error-message">
                    Please upload a wav, mp3 or m4a file.
                  </p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  className="signup-modal-button"
                  onClick={handleCloseAudioModal}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </span>
        </span>

        <hr />
        <span className="required-fields">
          <p id="required-fields-text">*required fields</p>
        </span>

        <span className="signup-button">
          <button id="signup-button" onClick={handleUpdateEncounterAndModal}>
            Update
          </button>
          <Modal show={showUpdateModal} className="signup-modal">
            <Modal.Body>
              {isUpdateSuccessful && (
                <p>You have successfully updated the encounter.</p>
              )}
              {isMissingFields && (
                <p id="error-message">Please fill all the required fields.</p>
              )}
              {isUpdateFail && (
                <p id="error-message">
                  Something went wrong. Please try again.
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              {isUpdateSuccessful && (
                <Button
                  variant="primary"
                  className="signup-modal-button"
                  onClick={backToEncountersWhenSuccessful}
                >
                  Close
                </Button>
              )}
              {isMissingFields || isUpdateFail ? (
                <Button
                  variant="primary"
                  className="signup-modal-button"
                  onClick={handleCloseUpdateModal}
                >
                  Close
                </Button>
              ) : null}
            </Modal.Footer>
          </Modal>
        </span>
      </Card>
    </div>
  );
}

export default UpdateEncounterCard;
