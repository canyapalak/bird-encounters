import "./MapModal.css";
import CloseButton from "react-bootstrap/esm/CloseButton";
import Modal from "react-bootstrap/Modal";
import EncounterMap from "../EncounterMap/EncounterMap";

function MapModal({ oneEncounter, showMap, handleCloseMap }) {
  return (
    <Modal
      show={showMap}
      onHide={handleCloseMap}
      className="map-modal"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modal-body">
        <div className="location-and-close-button">
          <span>
            <p>
              {oneEncounter && oneEncounter.location
                ? `${oneEncounter.location.area}, ${oneEncounter.location.province}, ${oneEncounter.location.country}`
                : "-"}
            </p>
          </span>
          <span>
            <CloseButton
              type="button"
              className="close-button"
              onClick={handleCloseMap}
            />
          </span>
        </div>
        <hr />
        <EncounterMap oneEncounter={oneEncounter} />
      </Modal.Body>
    </Modal>
  );
}

export default MapModal;
