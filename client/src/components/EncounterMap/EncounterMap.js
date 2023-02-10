import "./EncounterMap.css";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import LocationMarker from "../assets/marker.png";

function EncounterMap({ oneEncounter }) {
  return (
    <div id="map">
      <MapContainer
        center={[
          oneEncounter.coordinates.latitude,
          oneEncounter.coordinates.longitude,
        ]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "50vh", width: "50wh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[
            oneEncounter.coordinates.latitude,
            oneEncounter.coordinates.longitude,
          ]}
          icon={
            new Icon({
              iconUrl: LocationMarker,
              iconSize: [30, 35],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            <p id="popup-text">{oneEncounter.species}</p>
            <br />
            <img
              src={oneEncounter.image}
              alt="Bird Image"
              id="popup-image"
            />{" "}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default EncounterMap;
