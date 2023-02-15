import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./views/Home/Home";
import Encounters from "./views/Encounters/Encounters";
import Details from "./views/Details/Details";
import MapPage from "./views/MapPage/MapPage";
import SignUp from "./views/SignUp/SignUp";
import LogIn from "./views/LogIn/LogIn";
import { EncounterContextProvider } from "./store/EncounterContext";
import { AuthContextProvider } from "./store/AuthContext";
import Profile from "./views/Profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <EncounterContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/encounters" element={<Encounters />} />
              <Route path="/:_id" element={<Details />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              {/* <ProtectedRoute> */}
              <Route path="/profile" element={<Profile />} />
              {/* </ProtectedRoute> */}
            </Routes>
          </EncounterContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
