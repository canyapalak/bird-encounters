import React, { createContext, useState, useEffect } from "react";

export const EncounterContext = createContext();

export const EncounterContextProvider = (props) => {
  const [error, setError] = useState(null);
  const [encounters, setEncounters] = useState(null);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const fetchAllEncounters = async () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          const urlAllEncounters = "http://localhost:5000/api/encounters/all";
          const response = await fetch(urlAllEncounters);
          const results = await response.json();
          setEncounters(results.allEncounters);
          setLoading(false);
        } catch (err) {
          console.log("error", err);
          setError(err);
          setLoading(false);
        }
      }, 100);
    };
    fetchAllEncounters();
  }, []);

  return (
    <EncounterContext.Provider value={{ encounters, error, loading }}>
      {props.children}
    </EncounterContext.Provider>
  );
};
