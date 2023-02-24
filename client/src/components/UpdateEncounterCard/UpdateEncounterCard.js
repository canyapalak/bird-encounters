import "./UpdateEncounterCard.css";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewEncounterMapModal from "../NewEncounterMapModal/NewEncounterMapModal";
import { getToken } from "../../utils/getToken.js";
import { AuthContext } from "../../store/AuthContext";

function UpdateEncounterCard(props) {
  const { setIsEditing, isEditing } = props;
  const { currentUser } = useContext(AuthContext);
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
  const [isPostSuccessful, setIsPostSuccessful] = useState(false);
  const [isPostFail, setIsPostFail] = useState(false);
  const [isMissingFields, setIsMissingFields] = useState(false);
  const [showPictureModal, setShowPictureModal] = useState(false);
  const handleClosePictureModal = () => setShowPictureModal(false);
  const handleShowPictureModal = () => setShowPictureModal(true);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const handleCloseAudioModal = () => setShowAudioModal(false);
  const handleShowAudioModal = () => setShowAudioModal(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const handleClosePostModal = () => setShowPostModal(false);
  const handleShowPostModal = () => setShowPostModal(true);
  const [updateEncounterTimeValue, setUpdateEncounterTimeValue] = useState("");
  const [showNewEncounterMap, setShowNewEncounterMap] = useState(false);
  const handleShowNewEncounterMap = () => setShowNewEncounterMap(true);
  const handleCloseNewEncounterMap = () => setShowNewEncounterMap(false);
  const [encounterPosition, setEncounterPosition] = useState(null);
  const [updateEncounterPosition, setUpdateEncounterPosition] = useState(null);
  const now = new Date();
  const lat = encounterPosition && encounterPosition.lat.toFixed(6);
  const lng = encounterPosition && encounterPosition.lng.toFixed(6);
  const updatedLat =
    updateEncounterPosition && updateEncounterPosition.lat.toFixed(6);
  const updatedLng =
    updateEncounterPosition && updateEncounterPosition.lng.toFixed(6);

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

  console.log("encounterToUpdate :>> ", encounterToUpdate);
  console.log("updatedEncounterPosition :>> ", updateEncounterPosition);

  const handleInputChange = (e) => {
    console.log("e.target.name, e.target.value", e.target.name, e.target.value);
    setEncounterToUpdate({
      ...encounterToUpdate,
      [e.target.name]: e.target.value,
    });
  };

  //   const handleAttachPicture = (e) => {
  //     e.preventDefault();
  //     console.log("e.target :>> ", e.target.files[0]);
  //     setSelectedImageFile(e.target.files[0]);
  //   };

  //   const handleAttachAudio = (e) => {
  //     e.preventDefault();
  //     console.log("e.target :>> ", e.target.files[0]);
  //     setSelectedAudioFile(e.target.files[0]);
  //   };

  //   function handleSubmitPictureAndModal() {
  //     handleSubmitPicture();
  //     handleShowPictureModal();
  //   }

  //   function handleSubmitAudioAndModal() {
  //     handleSubmitAudio();
  //     handleShowAudioModal();
  //   }

  //   function handlePostEncounterAndModal() {
  //     handleSubmitEncounter();
  //     handleShowPostModal();
  //   }

  //   const handleSubmitPicture = async (e) => {
  //     setIsImageUploadSuccessful(false);
  //     setIsImageUploadFail(false);
  //     const formdata = new FormData();
  //     formdata.append("image", selectedImageFile);
  //     console.log("formData :>> ", formdata);

  //     const requestOptions = {
  //       method: "POST",
  //       body: formdata,
  //     };

  //     try {
  //       const response = await fetch(
  //         "http://localhost:5000/api/encounters/imageUploadEncounter",
  //         requestOptions
  //       );
  //       const result = await response.json();
  //       console.log("result", result);
  //       setNewEncounter({ ...newEncounter, image: result.imageUrl });
  //       if (result.msg === "image upload ok") {
  //         setIsImageUploadSuccessful(true);
  //       }
  //     } catch (error) {
  //       console.log("error :>> ", error);
  //       setIsImageUploadFail(true);
  //     }
  //   };

  //   const handleSubmitAudio = async (e) => {
  //     setIsAudioUploadSuccessful(false);
  //     setIsAudioUploadFail(false);
  //     const token = getToken();
  //     const formdata = new FormData();
  //     formdata.append("record", selectedAudioFile);

  //     console.log("formData :>> ", formdata);

  //     const requestOptions = {
  //       method: "POST",
  //       body: formdata,
  //     };

  //     try {
  //       const response = await fetch(
  //         "http://localhost:5000/api/encounters/audioUpload",
  //         requestOptions
  //       );
  //       const result = await response.json();
  //       console.log("result", result);
  //       setNewEncounter({ ...newEncounter, record: result.recordUrl });
  //       if (result.msg === "audio upload ok") {
  //         setIsAudioUploadSuccessful(true);
  //       }
  //     } catch (error) {
  //       console.log("error :>> ", error);
  //       setIsAudioUploadFail(true);
  //     }
  //   };

  const handleSubmitEncounter = async () => {
    const myHeaders = new Headers();
    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("title", encounterToUpdate.title);
    urlencoded.append("species", encounterToUpdate.species);
    urlencoded.append("province", encounterToUpdate.province);
    urlencoded.append("country", encounterToUpdate.country);
    urlencoded.append(
      "latitude",
      updateEncounterPosition !== null ? updatedLat : lat
    );
    urlencoded.append(
      "longitude",
      updateEncounterPosition !== null ? updatedLng : lng
    );
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
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  //   const handleSubmitEncounter = async () => {
  //     setIsMissingFields(false);
  //     setIsPostFail(false);
  //     setIsPostSuccessful(false);
  //     const token = getToken();
  //     if (token) {
  //       console.log("newEncounter :>> ", newEncounter);
  //       console.log("currentUser :>> ", currentUser);
  //       const myHeaders = new Headers();
  //       myHeaders.append("Authorization", `Bearer ${token}`);
  //       myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //       const urlencoded = new URLSearchParams();
  //       // urlencoded.append("userName", currentUser.userName);
  //       urlencoded.append("title", newEncounter.title);
  //       urlencoded.append("species", newEncounter.species);
  //       urlencoded.append("province", newEncounter.province);
  //       urlencoded.append("country", newEncounter.country);
  //       urlencoded.append("experience", newEncounter.experience);
  //       urlencoded.append("posttime", now);
  //       urlencoded.append("latitude", lat);
  //       urlencoded.append("longitude", lng);
  //       urlencoded.append("time", encounterTimeValue);
  //     //   urlencoded.append(
  //     //     "image",
  //     //     newEncounter.image ? newEncounter.image : EncounterPlaceholder
  //     //   );
  //     //   urlencoded.append(
  //     //     "record",
  //     //     newEncounter.record ? newEncounter.record : null
  //     //   );

  //       const requestOptions = {
  //         method: "POST",
  //         headers: myHeaders,
  //         body: urlencoded,
  //         redirect: "follow",
  //       };

  //       console.log("lat", lat);
  //       console.log("latitude", newEncounter.lat);

  //       fetch(
  //         "http://localhost:5000/api/encounters/postEncounter",
  //         requestOptions
  //       )
  //         .then((response) => response.json())
  //         .then((result) => {
  //           console.log(result);
  //           if (result.msg === "posting successful") {
  //             setIsPostSuccessful(true);
  //           }
  //           if (result.msg === "missing fields") {
  //             setIsMissingFields(true);
  //           }
  //         })
  //         .catch((error) => {
  //           setIsPostFail(true);
  //           console.log("error", error);
  //         });
  //     } else {
  //       console.log("no token");
  //     }
  //   };

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
          />
        </span>
        <span className="newencounter-encounter-time">
          <p>Encounter Time*: &nbsp;</p>
          <input
            type="datetime-local"
            name="time"
            id="time"
            onChange={(e) => setUpdateEncounterTimeValue(e.target.value)}
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
                // onChange={handleAttachPicture}
              />
            </span>
          </form>
          <button
            id="newencounter-upload-button"
            // onClick={handleSubmitPictureAndModal}
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
                // onChange={handleAttachAudio}
              />
            </span>
          </form>
          <button
            id="newencounter-upload-file-button"
            disabled={!selectedAudioFile}
            // onClick={handleSubmitAudioAndModal}
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
          <button id="signup-button" onClick={handleSubmitEncounter}>
            Update
          </button>
          <Modal show={showPostModal} className="signup-modal">
            <Modal.Body>
              {isPostSuccessful && (
                <p>You have successfully posted a new encounter.</p>
              )}
              {isMissingFields && (
                <p id="error-message">Please fill all the required fields.</p>
              )}
              {isPostFail && (
                <p id="error-message">
                  Something went wrong. Please try again.
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              {isPostSuccessful && (
                <Button
                  variant="primary"
                  className="signup-modal-button"
                  // onClick={() => redirectTo("/encounters")}
                  onClick={() => redirectTo("/encounters")}
                >
                  Close
                </Button>
              )}
              {isMissingFields || isPostFail ? (
                <Button
                  variant="primary"
                  className="signup-modal-button"
                  onClick={handleClosePostModal}
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
