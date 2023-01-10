import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

function Navigation() {

  const navigate = useNavigate();

  function logout() {
    navigate('/');
  }

  return (
    <Navbar bg="light" variant="light" className="border-bottom" sticky="top">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className="text-decoration-none text-black">Resume Builder</NavLink>
        </Navbar.Brand>
        <div className="btn-container">
          <Button id="logout-btn" variant="outlined" onClick={logout}>
            Log Out{" "}
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Navigation;
