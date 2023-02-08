import React, { createContext, useState } from "react";

export const EncounterContext = createContext();

export const EncounterContextProvider = (props) => {
  const [error, setError] = useState();
  const [encounters, setEncounters] = useState();

  const fetchAllEncounters = async () => {
    try {
      const urlAllEncounters = "http://localhost:5000/api/encounters/all";
      const response = await fetch(urlAllEncounters);
      const results = await response.json();
      console.log("results :>> ", results.allEncounters);

      setEncounters(results.allEncounters);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  return (
    <EncounterContext.Provider
      value={{ encounters, setEncounters, error, fetchAllEncounters }}
    >
      {props.children}
    </EncounterContext.Provider>
  );
};
