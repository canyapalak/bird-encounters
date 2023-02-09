import "./EncounterMap.css";
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function EncounterMap() {
  return (
    <div id="map">
      <MapContainer
        center={[44.739225, 3.045669]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "50vh", width: "50wh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[44.739225, 3.045669]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default EncounterMap;
