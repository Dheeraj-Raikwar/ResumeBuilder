import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import Profile from './Profile';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Editor() {
  const navigate = useNavigate();

  function logout() {
    navigate('/');
  }

  return (
    <Fragment>

      {/* Header */}
      <div className="header-container">
        <div className="btn-container">
          <Button id="signin" variant="outlined" onClick={logout}>
            Log Out{" "}
          </Button>
        </div>
      </div>

      {/* Editing Rows Components */}
      <Container fluid className="p-0 top-image"></Container>
      <Container>

        <Profile></Profile>

        <About></About>

        <Experience></Experience>

        <Education></Education>

        <Skills></Skills>

        <div className="d-grid col-2 mx-auto my-4 text-center">
          <NavLink className="nav-link align-middle bg-dark text-white p-2 rounded" to="/home/preview">Preview</NavLink>
        </div>

      </Container>

    </Fragment>
  )
}

export default Editor