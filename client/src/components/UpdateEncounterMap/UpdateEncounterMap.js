import "./UpdateEncounterMap.css";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLng } from "leaflet";
import BirdMarker from "../../assets/bird-marker.png";

function NewEncounterMap({
  updateEncounterPosition,
  setUpdateEncounterPosition,
  encounterToUpdate,
}) {
  const encounterToUpdateLatLng = encounterToUpdate
    ? new LatLng(encounterToUpdate.latitude, encounterToUpdate.longitude)
    : null;

  function LocationMarker({}) {
    const map = useMapEvents({
      locationfound(e) {
        map.flyTo(encounterToUpdateLatLng, map.getZoom());
      },
      click(e) {
        setUpdateEncounterPosition(e.latlng);
      },
    });

    useEffect(() => {
      map.locate();
    }, [map]);

    return (
      <>
        {!updateEncounterPosition && (
          <Marker
            position={encounterToUpdateLatLng}
            icon={
              new Icon({
                iconUrl: BirdMarker,
                iconSize: [30, 35],
                iconAnchor: [12, 31],
              })
            }
          >
            <Popup>Encounter Location</Popup>
          </Marker>
        )}
        {updateEncounterPosition && (
          <Marker
            position={updateEncounterPosition}
            icon={
              new Icon({
                iconUrl: BirdMarker,
                iconSize: [30, 35],
                iconAnchor: [12, 31],
              })
            }
          >
            <Popup>Update marker</Popup>
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
