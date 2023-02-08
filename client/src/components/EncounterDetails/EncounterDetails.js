import "./EncounterDetails.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EncounterDetails() {
  const [oneEncounter, setOneEncounter] = useState("");
  const [error, setError] = useState();
  const { _id } = useParams();

  const postTime = (dateAndTime) => {
    const date = new Date(dateAndTime).toLocaleDateString();
    const time = new Date(dateAndTime).toLocaleTimeString();
    return (
      <>
        {date} {time}
      </>
    );
  };
  useEffect(() => {
    const fetchEncounterById = async () => {
      try {
        const urlFetchEncounterById = `http://localhost:5000/api/encounters/${_id}`;
        const response = await fetch(urlFetchEncounterById);
        const results = await response.json();
        console.log("results :>> ", results);

        setOneEncounter(results.requestedId[0]);
      } catch (error) {
        console.log("error", error);
        setError(error);
      }
    };

    console.log("oneEncounter :>> ", oneEncounter);

    fetchEncounterById();
  }, []);
  return (
    <div>
      <p>{oneEncounter.username}</p>
      <p>{oneEncounter.experience}</p>
    </div>
  );
}
export default EncounterDetails;
