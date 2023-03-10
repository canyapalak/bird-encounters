import "./EncounterMap.css";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import LocationMarker from "../../assets/marker.png";

function EncounterMap({ oneEncounter }) {
  return (
    <div id="map">
      <MapContainer
        center={[oneEncounter.latitude, oneEncounter.longitude]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "50vh", width: "50wh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[oneEncounter.latitude, oneEncounter.longitude]}
          icon={
            new Icon({
              iconUrl: LocationMarker,
              iconSize: [30, 35],
              iconAnchor: [13, 31],
            })
          }
        >
          <Popup>
            <p id="popup-text">{oneEncounter.species}</p>
            <br />
            <img
              src={oneEncounter.image}
              alt="Encounter"
              id="popup-image"
            />{" "}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default EncounterMap;
