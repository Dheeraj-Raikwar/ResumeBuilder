import React, { Fragment, useEffect, useState } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Profile from "./Profile";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import { NavLink } from "react-router-dom";

// Editor Component which includes Profile, About, Experience, .. components
function Editor() {
  const [type, setType] = useState();
  const [isGraduate, setisGraduate] = useState(false);
  const [isExperienced, setIsExperienced] = useState(false);
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
    if (type === "gra") {
      setisGraduate(true);
      setIsExperienced(false);
    }
    if (type === "exp") {
      setIsExperienced(true);
      setisGraduate(false);
    }

    localStorage.setItem("resumeType", type);
  }, [type, userEmail]);

  return (
    <Fragment>
      {userEmail != "null" && typeof userEmail === "string" ? (
        <>
          {/* Card Container */}
          <Container>
            <div className="Card-container">
              <Row xs={1} md={2} className="g-4">
                <Col>
                  <Card style={{ width: "18rem", height: "19rem" }}>
                    <Card.Img
                      variant="top"
                      src="https://iili.io/H7UvS6v.webp"
                    />
                    <Card.Body>
                      <Card.Title>Graduate/Fresher</Card.Title>
                      <Button
                        variant={isGraduate ? "success" : "primary"}
                        disabled={isGraduate}
                        onClick={() => setType("gra")}
                      >
                        {isGraduate ? (
                          <span style={{ color: "#fff68f" }}>Selected</span>
                        ) : (
                          <span>Select</span>
                        )}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ width: "18rem", height: "19rem" }}>
                    <Card.Img variant="top" src="https://iili.io/H7UvgFR.jpg" />
                    <Card.Body>
                      <Card.Title>Experienced</Card.Title>
                      <Button
                        variant={isExperienced ? "success" : "primary"}
                        disabled={isExperienced}
                        onClick={() => setType("exp")}
                      >
                        {isExperienced ? (
                          <span style={{ color: "#fff68f" }}>Selected</span>
                        ) : (
                          <span>Select</span>
                        )}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>

          {/* Main Container for editing Rows Components*/}

          {typeof type !== "undefined" ? (
            <Container>
              <Profile></Profile>

              <About></About>
              {isExperienced ? <Experience></Experience> : null}
              <Education></Education>

              <Skills></Skills>

              <div className="d-grid col-2 mx-auto my-4 text-center">
                <NavLink
                  className="nav-link align-middle bg-dark text-white p-2 rounded"
                  to="/home/preview"
                >
                  Preview
                </NavLink>
              </div>
            </Container>
          ) : null}
        </>
      ) : (
        <h6>Page Not Found</h6>
      )}
    </Fragment>
  );
}

export default Editor;
