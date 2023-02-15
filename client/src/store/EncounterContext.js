import React, { createContext, useState, useEffect } from "react";

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
  }, []);

  return (
    <EncounterContext.Provider value={{ encounters, error }}>
      {props.children}
    </EncounterContext.Provider>
  );
};
