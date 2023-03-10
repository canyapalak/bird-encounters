import React, { createContext, useState, useEffect } from "react";
import Spinner from "../../src/assets/spinner.gif";
import { serverURL } from "../utils/serverURL.js";

export const EncounterContext = createContext();

export const EncounterContextProvider = (props) => {
  const [error, setError] = useState(null);
  const [encounters, setEncounters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isToggled, setIsToggled] = useState(false);
  const [backToEncountersWithUpdate, setBackToEncountersWithUpdate] =
    useState(false);

  useEffect(() => {
    const fetchAllEncounters = async () => {
      setLoading(true);
      try {
        const urlAllEncounters =
          "https://bird-encounters-backend.vercel.app/api/encounters/all";
        const response = await fetch(urlAllEncounters);
        const results = await response.json();
        setEncounters(results.allEncounters);
        setLoading(false);
      } catch (err) {
        // console.log("error", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchAllEncounters();
  }, [isToggled, backToEncountersWithUpdate]);

  return (
    <EncounterContext.Provider
      value={{
        encounters,
        error,
        loading,
        isToggled,
        setIsToggled,
        setBackToEncountersWithUpdate,
      }}
    >
      {props.children}
    </EncounterContext.Provider>
  );
};
