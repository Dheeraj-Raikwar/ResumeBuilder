import "./landingPage.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function LandingPage() {
  const [signInopen, setsignInopen] = useState(false);
  const signInhandleOpen = () => setsignInopen(true);
  const signInhandleClose = () => setsignInopen(false);

  const [signupopen, setsignupopen] = useState(false);
  const signUphandleOpen = () => setsignupopen(true);
  const signUphandleClose = () => setsignupopen(false);

  const navigate = useNavigate();

  var emailError, passwordError;
  function validateEmail(value) {

    if (!value) {
      emailError = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      emailError = "Invalid email address";
    }
    else {
      emailError = " "
    }

    return emailError;
  }

  function validatePassword(value) {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (value.length < 8) {
      passwordError = "Password should be min length of 8";
    }
    else if (!value.match(regex)) {
      passwordError = "password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    }
    else {
      passwordError = " "
    }

    return passwordError;
  }

  function signIn() {
    if (emailError === " " && passwordError === " ")
      navigate('/home');
  }

  return (
    <header>
      <div className="header-container">
        <div className="btn-container">
          <Button id="signin" variant="outlined" onClick={signInhandleOpen}>
            Sign in{" "}
          </Button>
          <Button id="signup" variant="outlined" onClick={signUphandleOpen}>
            Sign up
          </Button>
          {signInopen ? (

            <Modal
              show={signInopen}
              onHide={signInhandleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Resume Builder</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Sign In
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Please fill all details to sign in.
                </Typography>
                <div>
                  <Formik
                    initialValues={{
                      email: "",
                      password: ""
                    }}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    {({ errors, touched, isValidating }) => (
                      <Form onSubmit={signIn}>
                        <div className="formContainer">
                          <Field name="email" validate={validateEmail} placeholder="Enter email" />

                          {errors.email && touched.email && (
                            <div><span style={{ color: "#ff665b" }}>{errors.email}</span></div>
                          )}

                          <Field name="password" type="password" validate={validatePassword} placeholder="Enter Password" />

                          {errors.password && touched.password && (
                            <div><span style={{ color: "#ff665b" }}>{errors.password}</span></div>
                          )}
                          <Modal.Footer>
                            <Button variant="secondary" onClick={signInhandleClose}>
                              Close
                            </Button>
                            <Button variant="primary" type="submit">Submit</Button>
                          </Modal.Footer>

                        </div>

                      </Form>
                    )}
                  </Formik>
                </div>

              </Modal.Body>

            </Modal>
          ) : null}
          {signupopen ? (
            <Modal
            show={signupopen}
            onHide={signUphandleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Resume Builder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Sign Up
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Please fill all details to sign-up.
              </Typography>
              <div>
                <Formik
                  initialValues={{
                    email: "",
                    password: ""
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  {({ errors, touched, isValidating }) => (
                    <Form>
                      <div className="formContainer">
                        <Field name="email" validate={validateEmail} placeholder="Enter email" />

                        {errors.email && touched.email && (
                          <div><span style={{ color: "#ff665b" }}>{errors.email}</span></div>
                        )}

                        <Field name="password" type="password" validate={validatePassword} placeholder="Enter Password" />

                        {errors.password && touched.password && (
                          <div><span style={{ color: "#ff665b" }}>{errors.password}</span></div>
                        )}
                        <Modal.Footer>
                          <Button variant="secondary" onClick={signUphandleClose}>
                            Close
                          </Button>
                          <Button variant="primary" type="submit">Submit</Button>
                        </Modal.Footer>

                      </div>

                    </Form>
                  )}
                </Formik>
              </div>

            </Modal.Body>

          </Modal>
          ) : null}
        </div>
        <div
          id="intro-example"
          className="p-5 text-center bg-image"
          style={{
            // backgroundImage:
            //   "url('https://i.ibb.co/BNGSbhC/minimalist-background-uhd-8k-wallpaper.png')",
            height: "626px"
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3">Resume Builder</h1>
                <MDBBtn id="btn-center" tag="a" outline size="lg" onClick={signInhandleOpen}>
                  Create Resume Now
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default LandingPage;
