import "./landingPage.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import RForm from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
function LandingPage() {
  const [signInopen, setsignInopen] = useState(false);

  const signInhandleOpen = () => setsignInopen(true);
  const signInhandleClose = () => setsignInopen(false);

  const [signupopen, setsignupopen] = useState(false);
  const signUphandleOpen = () => setsignupopen(true);
  const signUphandleClose = () => setsignupopen(false);

  const [successHandle, setsuccessHandle] = useState(false);
  const successHandleOpen = () => setsuccessHandle();
  const successHandleClose = () => setsuccessHandle(false);

  const [response, setResponse] = useState();

  const navigate = useNavigate();

  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");

  var emailError, passwordError;

  function validateEmail(value) {
    if (!value) {
      emailError = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      emailError = "Invalid email address";
    } else {
      emailError = " ";
      setEmail(value);
    }

    return emailError;
  }

  function validatePassword(value) {
    var regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (value.length < 8) {
      passwordError = "Password should be min length of 8, max: 15 characters";
    } else if (!value.match(regex)) {
      passwordError =
        "password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    } else {
      passwordError = " ";
      setPassword(value);
    }

    return passwordError;
  }

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  function signIn(e) {

    if ((userEmail !== "" && userPassword !== "") && (userEmail !== null && userPassword !== null)) {
      console.log("userEmail", userEmail);
      fetch("http://localhost:3001/login", {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response: ", data);
          if (data.message !== "False" && data.message !== "True") {
            setResponse(data.message);
            successHandleOpen();
            e.preventDefault();
          } else if (data.message === "True") {
            setResponse("Login successful");
            successHandleOpen();
            e.preventDefault();
            localStorage.setItem("userEmail", userEmail);
            navigate("./home");
          } else if (data.message === "False") {
            setResponse("Email or Password mismatch");
            successHandleOpen();
            e.preventDefault();
          } else {
            setResponse("Something went wrong");
            successHandleOpen();
            e.preventDefault();
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      setResponse("Please enter details");
      successHandleOpen();
      e.preventDefault();
    }
    e.preventDefault();
  }
  function signup(e) {
    if ((userEmail !== "" && userPassword !== "") && (userEmail !== null && userPassword !== null)) {
      fetch("http://localhost:3001/signup", {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response: ", data);
          setResponse(data);
          successHandleOpen();
          signUphandleClose();
          e.preventDefault();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      setResponse("Please enter details");
      successHandleOpen();
      e.preventDefault();
    }
    e.preventDefault();
  }

  return (
    <>
      <header>
        <Navbar className="bg-info">
          <img
            src="https://apps.odoocdn.com/web/image/loempia.module/144565/icon_image/"
            width="50"
            height="50"
          />
          <Navbar.Brand href="#home">Resume Builder</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar>
      </header>

      <div className="body-container">
        <div>
          <div
            id="intro-example"
            className="p-5 text-center bg-image"
            style={{
              // backgroundImage:
              //   "url('https://i.ibb.co/BNGSbhC/minimalist-background-uhd-8k-wallpaper.png')",
              height: "720px",
            }}
          >
            <section id="sectionId">
              <div className="form-outer-container">
                <div className="formContainer">
                  <h5>Login</h5>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    {({ errors, touched, isValidating }) => (
                      <Form onSubmit={signIn}>
                        <div>
                          {/* <RForm.Label>Email</RForm.Label> */}
                          <Field
                            name="email"
                            validate={validateEmail}
                            placeholder="Enter email"
                          />

                          {errors.email && touched.email && (
                            <div>
                              <span style={{ color: "#ff665b" }}>
                                {errors.email}
                              </span>
                            </div>
                          )}
                          <br />
                          <br />
                          {/* <RForm.Label>Password</RForm.Label> */}
                          <Field
                            name="password"
                            type="password"
                            validate={validatePassword}
                            placeholder="Enter Password"
                          />

                          {errors.password && touched.password && (
                            <div>
                              <span style={{ color: "#ff665b" }}>
                                {errors.password}
                              </span>
                            </div>
                          )}

                          <Button
                            variant="primary"
                            type="submit"
                            className="signin m-3"
                          >
                            Login
                          </Button>
                          <div className="d-flex flex-row">
                            <p>Not a user?</p>
                            <Alert.Link onClick={signUphandleOpen}>
                              Sign up
                            </Alert.Link>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Sign Up
            </Typography>
            <div>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ errors, touched, isValidating }) => (
                  <Form onSubmit={signup}>
                    <div className="formContainer">
                      <Field
                        name="email"
                        validate={validateEmail}
                        placeholder="Enter email"
                      />

                      {errors.email && touched.email && (
                        <div>
                          <span style={{ color: "#ff665b" }}>
                            {errors.email}
                          </span>
                        </div>
                      )}

                      <Field
                        name="password"
                        type="password"
                        validate={validatePassword}
                        placeholder="Enter Password"
                      />

                      {errors.password && touched.password && (
                        <div>
                          <span style={{ color: "#ff665b" }}>
                            {errors.password}
                          </span>
                        </div>
                      )}
                      <Modal.Footer>
                        <Button variant="primary" type="submit">
                          Sign Up
                        </Button>
                      </Modal.Footer>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Modal.Body>
        </Modal>
      ) : null}

      <ToastContainer className="p-3" position="bottom-end">
        <Toast show={successHandle} onClose={successHandleClose}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Message</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          {typeof response === "object" &&
          !Array.isArray(response) &&
          response !== null &&
          response.exists ? (
            <Toast.Body> User already exists. </Toast.Body>
          ) : (
            <Toast.Body> {response} </Toast.Body>
          )}
        </Toast>
      </ToastContainer>
    </>
  );
}

export default LandingPage;
