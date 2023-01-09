import logo from "./logo.svg";
import React, { useState } from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage"
import Homepage from "./pages/Homepage"

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home/*" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
  );

}

export default App;
