import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./views/Home/Home";
import Encounters from "./views/Encounters/Encounters";
import Details from "./views/Details/Details";
import { EncounterContextProvider } from "./store/EncounterContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <EncounterContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/encounters" element={<Encounters />} />
            <Route path="/:_id" element={<Details />} />
          </Routes>
        </EncounterContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
