import "./UpdateProfileCard.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { getToken } from "../../utils/getToken";
import { useNavigate } from "react-router-dom";

function UpdateProfileCard({ setIsEditing }) {
  const { userProfile, getProfile } = useContext(AuthContext);
  const redirectTo = useNavigate();
  const [profileToUpdate, setProfileToUpdate] = useState();
  const [updatedProfilePicture, setUpdatedProfilePicture] = useState(null);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [isMailInUse, setIsMailInUse] = useState(false);
  const [isUserNameInUse, setIsUserNameInUse] = useState(false);
  const [isMailInvalid, setIsMailInvalid] = useState(false);
  const [isPasswordShort, setIsPasswordShort] = useState(false);
  const [isUpdateFail, setIsUpdateFail] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isImageUploadSuccessful, setIsImageUploadSuccessful] = useState(false);
  const [isImageUploadFail, setIsImageUploadFail] = useState(false);
  const [showPictureModal, setShowPictureModal] = useState(false);
  const handleClosePictureModal = () => setShowPictureModal(false);
  const handleShowPictureModal = () => setShowPictureModal(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);

  console.log("userProfile", userProfile);

  useEffect(() => {
    getProfile();
  }, [isImageUploadSuccessful, isUpdateSuccessful]);

  const handleInputChange = (e) => {
    console.log("e.target.name, e.target.value", e.target.name, e.target.value);
    setProfileToUpdate({
      ...profileToUpdate,
      [e.target.name]: e.target.value,
    });
  };

  function handleCloseModalandUpdateProfile() {
    redirectTo("/profile");
    handleCloseUpdateModal();
    setIsEditing(false);
  }

  const handleAttachPicture = (e) => {
    e.preventDefault();
    console.log("e.target :>> ", e.target.files[0]);
    setSelectedImageFile(e.target.files[0]);
  };

  function handleSubmitPictureAndModal() {
    handleSubmitPicture();
    handleShowPictureModal();
  }

  function handleUpdateProfileAndModal() {
    handleUpdateProfile();
    handleShowUpdateModal();
  }

  //upload image for account
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
        "http://localhost:5000/api/users/imageUpload",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      setProfileToUpdate({
        ...profileToUpdate,
        userPicture: result.imageUrl,
      });
      setUpdatedProfilePicture(result.imageUrl);
      if (result.msg === "image upload ok") {
        setIsImageUploadSuccessful(true);
      }
    } catch (error) {
      console.log("error :>> ", error);
      setIsImageUploadFail(true);
    }
  };

  console.log("profileToUpdate :>> ", profileToUpdate);

  //update account
  const handleUpdateProfile = async () => {
    setIsImageUploadFail(false);
    setIsImageUploadSuccessful(false);
    setIsMailInUse(false);
    setIsMailInvalid(false);
    setIsPasswordShort(false);
    setIsUpdateFail(false);
    setIsUpdateSuccessful(false);
    setIsUserNameInUse(false);

    const myHeaders = new Headers();
    const token = getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    function isNullUndefinedOrEmpty(value) {
      return (
        value === null ||
        value === "null" ||
        value === "undefined" ||
        value === undefined ||
        value === ""
      );
    }

    const urlencoded = new URLSearchParams();
    console.log("userName", profileToUpdate.userName);
    if (!isNullUndefinedOrEmpty(profileToUpdate.userName)) {
      urlencoded.append("userName", profileToUpdate.userName);
    }
    if (!isNullUndefinedOrEmpty(profileToUpdate.email)) {
      urlencoded.append("email", profileToUpdate.email);
    }
    if (!isNullUndefinedOrEmpty(profileToUpdate.password)) {
      urlencoded.append("password", profileToUpdate.password);
    }
    if (!isNullUndefinedOrEmpty(profileToUpdate.userPicture)) {
      urlencoded.append("userPicture", profileToUpdate.userPicture);
    }

    console.log("profileToUpdate", profileToUpdate);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/users/updateProfile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("UPDATE RESULT", result);
        if (result.errors && result.errors.msg === "Username already in use") {
          setIsUserNameInUse(true);
        }
        if (result.errors && result.errors.msg === "Email already in use") {
          setIsMailInUse(true);
        }
        if (result.errors && result.errors.msg === "email address is invalid") {
          setIsMailInvalid(true);
        }
        if (
          result.errors &&
          result.errors.msg === "password should be at least 6 characters"
        ) {
          setIsPasswordShort(true);
        }
        if (result.msg && result.msg === "Update successful") {
          setIsUpdateSuccessful(true);
        }
      })

      .catch((error) => {
        setIsUpdateFail(true);
        console.log("error", error);
      });
  };

  return (
    <>
      <div className="signup-container">
        <Card className="signup-card">
          <span className="user-picture">
            {updatedProfilePicture ? (
              <img src={updatedProfilePicture} alt="Avatar"></img>
            ) : (
              <img src={userProfile.userPicture} alt="Avatar"></img>
            )}
          </span>
          <span className="upload-profile-picture">
            <form>
              <span className="signup-avatar">
                <p id="update-profile-p">Profile Picture: &nbsp;</p>
                <input
                  type="file"
                  name="userPicture"
                  id="upload-image"
                  className="form-control"
                  onChange={handleAttachPicture}
                />
              </span>
            </form>
            <button
              onClick={handleSubmitPictureAndModal}
              id="upload-button"
              disabled={!selectedImageFile}
            >
              Upload
            </button>
          </span>
          <Modal show={showPictureModal} className="signup-modal">
            <Modal.Body>
              {isImageUploadSuccessful && (
                <p>You have successfully uploaded your picture.</p>
              )}
              {isImageUploadFail && (
                <p id="error-message">Please upload a jpg, jpeg or png file.</p>
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
          <span className="signup-username">
            <p>Username: &nbsp;</p>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              className="signup-input"
              value={profileToUpdate?.userName || userProfile?.userName || ""}
              onChange={handleInputChange}
            />
          </span>
          <span className="signup-email">
            <p>E-mail Address: &nbsp;</p>
            <input
              type="text"
              name="email"
              placeholder="E-mail Address"
              className="signup-input"
              value={profileToUpdate?.email || userProfile?.email || ""}
              onChange={handleInputChange}
            />
          </span>

          <span className="signup-password">
            <p>Password: &nbsp;</p>
            <input
              type="text"
              name="password"
              placeholder="Change Password"
              className="password-input"
              onChange={handleInputChange}
            />
          </span>

          <hr id="update-profile-hr" />

          <span className="update-profile-button">
            <button onClick={handleUpdateProfileAndModal} id="signup-button">
              Update
            </button>
            <Modal show={showUpdateModal} className="signup-modal">
              <Modal.Body>
                {isUpdateSuccessful && (
                  <p>You have successfully updated your profile.</p>
                )}
                {isMailInUse && (
                  <p id="error-message">
                    This e-mail address is in use. Try another one.
                  </p>
                )}
                {isUserNameInUse && (
                  <p id="error-message">
                    This username is in use. Username should be unique.
                  </p>
                )}
                {isMailInvalid && (
                  <p id="error-message">
                    E-mail address is invalid. Please check it.
                  </p>
                )}
                {isPasswordShort && (
                  <p id="error-message">
                    Password should be at least 6 characters.
                  </p>
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
                    onClick={handleCloseModalandUpdateProfile}
                  >
                    Close
                  </Button>
                )}
                {isMailInUse ||
                isUserNameInUse ||
                isMailInvalid ||
                isPasswordShort ||
                isUpdateFail ? (
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
    </>
  );
}

export default UpdateProfileCard;
