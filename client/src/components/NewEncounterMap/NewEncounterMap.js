import "./NewEncounterMap.css";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerIcon from "../../assets/marker.png";
import BirdMarker from "../../assets/bird-marker.png";

function NewEncounterMap({ encounterPosition, setEncounterPosition }) {
  function LocationMarker({}) {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
      click(e) {
        setEncounterPosition(e.latlng);
        // console.log("encounterPosition", encounterPosition);
      },
    });

    useEffect(() => {
      map.locate();
    }, [map]);

    // console.log("position :>> ", position);
    // console.log("encounterPosition", encounterPosition);

    return position === null ? null : (
      <>
        <Marker
          position={position}
          icon={
            new Icon({
              iconUrl: MarkerIcon,
              iconSize: [30, 35],
              iconAnchor: [12, 31],
            })
          }
        >
          <Popup>You are here</Popup>
        </Marker>
        {encounterPosition && (
          <Marker
            position={encounterPosition}
            icon={
              new Icon({
                iconUrl: BirdMarker,
                iconSize: [30, 35],
                iconAnchor: [12, 31],
              })
            }
          >
            <Popup>New marker</Popup>
          </Marker>
        )}
      </>
    );
  }

  return (
    <div className="newencounter-map">
      <MapContainer
        center={[51.5, 0.11]}
        zoom={9}
        scrollWheelZoom={false}
        id="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default NewEncounterMap;
