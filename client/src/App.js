import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./views/Home/Home";
import Encounters from "./views/Encounters/Encounters";
import Details from "./views/Details/Details";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/encounters" element={<Encounters />} />
          <Route path="/:_id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
