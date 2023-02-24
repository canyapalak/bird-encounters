import "./NewEncounterMapModal.css";
import CloseButton from "react-bootstrap/esm/CloseButton";
import Modal from "react-bootstrap/Modal";
import NewEncounterMap from "../NewEncounterMap/NewEncounterMap";

function NewEncounterMapModal({
  showNewEncounterMap,
  handleCloseNewEncounterMap,
  encounterPosition,
  setEncounterPosition,
  updateEncounterPosition,
  setUpdateEncounterPosition,
  isEditing,
}) {
  return (
    <Modal
      show={showNewEncounterMap}
      onHide={handleCloseNewEncounterMap}
      className="map-modal"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modal-body">
        <div className="location-and-close-button">
          <span>
            <p>Select a location to set the coordinates</p>
          </span>
          <span>
            <CloseButton
              type="button"
              className="close-button"
              onClick={handleCloseNewEncounterMap}
            />
          </span>
        </div>
        <hr />
        <NewEncounterMap
          updateEncounterPosition={updateEncounterPosition}
          setUpdateEncounterPosition={setUpdateEncounterPosition}
          encounterPosition={encounterPosition}
          setEncounterPosition={setEncounterPosition}
          isEditing={isEditing}
        />
      </Modal.Body>
    </Modal>
  );
}

export default NewEncounterMapModal;
