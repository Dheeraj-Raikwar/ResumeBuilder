import "./landingPage.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Button, Typography, Box, Fade, Modal, Backdrop } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useNavigate } from 'react-router-dom';

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
    else{
      emailError=" "
    }

    return emailError;
  }

  function validatePassword(value) {
    var regex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (value.length < 8) {
      passwordError = "Password should be min length of 8";
    }
    else if (!value.match(regex)) {
      passwordError = "password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    }
    else{
      passwordError=" "
    }

    return passwordError;
  }

  function signIn() {
    if(emailError===" " && passwordError===" ")
    navigate('/home');
  }

  return (
    <header>
      <div className="outer-container">
        <div className="btn-container">
          <Button id="signin" variant="outlined" onClick={signInhandleOpen}>
            Sign in{" "}
          </Button>
          <Button id="signup" variant="outlined" onClick={signUphandleOpen}>
            Sign up
          </Button>
          {signInopen ? (
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={signInopen}
              onClose={signInhandleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={signInopen}>
                <Box sx={modalStyle}>
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
                        // same shape as initial values

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

                          <Field name="password" validate={validatePassword} placeholder="Enter Password" />

                          {errors.password && touched.password && (
                            <div><span style={{ color: "#ff665b" }}>{errors.password}</span></div>
                          )}

                
                          <button id = "sign-btn" type="submit" >Submit</button>
                          </div>
                
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Box>
              </Fade>
            </Modal>
          ) : null}
          {signupopen ? (
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={signupopen}
              onClose={signUphandleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={signupopen}>
                <Box sx={modalStyle}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Sign Up
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Please fill all details to sign up.
                  </Typography>
                  <div>
                    <Formik
                      initialValues={{
                        email: "",
                        password: ""
                      }}
                      onSubmit={(values) => {
                        // same shape as initial values

                        console.log(values);
                      }}
                    >
                      {({ errors, touched, isValidating }) => (
                        <Form>
                          <div className="formContainer">
                          <Field name="email" validate={validateEmail} placeholder="Enter email"/>

                          {errors.email && touched.email && (
                            <div><span style={{ color: "#ff665b" }}>{errors.email}</span></div>
                          )}

                          <Field name="password" validate={validatePassword} placeholder="Enter Password"/>

                          {errors.password && touched.password && (
                            <div><span style={{ color: "#ff665b" }}>{errors.password}</span></div>
                          )}
                          
                          <button id = "sign-btn" type="submit">Submit</button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Box>
              </Fade>
            </Modal>
          ) : null}
        </div>
        <div
          id="intro-example"
          className="p-5 text-center bg-image"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/BNGSbhC/minimalist-background-uhd-8k-wallpaper.png')",
            height: "626px",
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3">Resume Builder</h1>
                <MDBBtn id="btn-center" tag="a" outline size="lg">
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