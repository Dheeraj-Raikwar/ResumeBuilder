import logo from "./logo.svg";
import React, { useState } from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage"
import Homepage from "./pages/Homepage"

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Homepage />} />
        </Switch>
      </BrowserRouter>
  );

}

export default App;
