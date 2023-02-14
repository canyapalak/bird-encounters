import React, { createContext, useState, useEffect } from "react";
import { getToken } from "../utils/getToken";

export const EncounterContext = createContext();

export const EncounterContextProvider = (props) => {
  const [error, setError] = useState(null);
  const [encounters, setEncounters] = useState(null);

  useEffect(() => {
    const fetchAllEncounters = async () => {
      try {
        const urlAllEncounters = "http://localhost:5000/api/encounters/all";
        const response = await fetch(urlAllEncounters);
        const results = await response.json();
        setEncounters(results.allEncounters);
      } catch (err) {
        console.log("error", err);
        setError(err);
      }
    };

    fetchAllEncounters();
    const token = getToken();
    if (token) {
      console.log("LOGGED IN");
    } else {
      console.log("NOT logged in");
    }
  }, []);

  return (
    <EncounterContext.Provider value={{ encounters, error, token }}>
      {props.children}
    </EncounterContext.Provider>
  );
};
