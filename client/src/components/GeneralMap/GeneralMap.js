import "./GeneralMap.css";
import React, { useContext } from "react";
import { EncounterContext } from "../../store/EncounterContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Link } from "react-router-dom";
import LocationMarker from "../../assets/marker.png";

function EncounterMap() {
  const { encounters } = useContext(EncounterContext);
  return (
    <div className="main-container">
      <span className="general-map-card">
        {encounters && encounters.length ? (
          <p>
            {" "}
            There are currently {encounters.length} encounters across the world.
          </p>
        ) : (
          <p></p>
        )}
        <MapContainer
          center={[25, 10]}
          zoom={2}
          scrollWheelZoom={false}
          //   style={{ height: "61vh" }}
          id="map-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {encounters &&
            encounters.map((encounter, index) => (
              <Marker
                key={index}
                position={[encounter.latitude, encounter.longitude]}
                icon={
                  new Icon({
                    iconUrl: LocationMarker,
                    iconSize: [30, 35],
                    iconAnchor: [12, 31],
                  })
                }
              >
                <Popup className="general-map-popup">
                  <Link to={"/" + encounter._id}>
                    <p id="popup-text">{encounter.species}</p>
                  </Link>
                  <br />
                  <img
                    src={encounter.image}
                    alt="Encounter"
                    id="popup-image"
                  />{" "}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </span>
    </div>
  );
}

export default EncounterMap;
