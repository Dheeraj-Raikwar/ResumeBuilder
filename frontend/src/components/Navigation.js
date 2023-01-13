import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// Navigation Component
function Navigation() {
  const navigate = useNavigate();

  function logout() {
    localStorage.setItem("userEmail", null);
    navigate("/");
  }

  function goback() {
    navigate("/home");
  }

  return (
    <Navbar bg="info" variant="light" className="border-bottom" sticky="top">
      <IconButton aria-label="delete" onClick={goback}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Navbar.Brand>
        <img
          src="https://apps.odoocdn.com/web/image/loempia.module/144565/icon_image/"
          width="50"
          height="60"
        />
        <NavLink to="/" className="text-decoration-none text-black">
          Resume Builder
        </NavLink>
      </Navbar.Brand>
      <div className="btn-container">
        <Button id="logout-btn" variant="outlined" onClick={logout}>
          Log Out{" "}
        </Button>
      </div>
    </Navbar>
  );
}

export default Navigation;
