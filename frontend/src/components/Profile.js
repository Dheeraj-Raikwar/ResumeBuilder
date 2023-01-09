import React, { Fragment, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdAddCircleOutline, MdEdit, MdClose } from "react-icons/md";
import {
  HiLocationMarker,
  HiOfficeBuilding,
  HiOutlineMail,
  HiPhone,
} from "react-icons/hi";
import { BsGithub, BsLinkedin, BsGlobe } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function Profile() {
  const profile = useSelector((state) => state.profile);
  const file = useSelector((state) => state.file);
  const dispatch = useDispatch();
  const { manageProfile, manageFile } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const [isEdit, setIsEdit] = useState(false);

  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState({
    name: false,
    location: false,
    position: false,
    tagline: false,
    email: false,
    contact: false,
    github: false,
    linkedin: false,
    website: false,
  });

  const [profileName, setProfileName] = useState("");
  const [profileURL, setProfileURL] = useState("");

  const [emailError, setEmailerror] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [file, setFile] = useState("./images/profile.jpg");
  function handleFile(e) {
    manageFile(URL.createObjectURL(e.target.files[0]));
    // setFile(URL.createObjectURL(e.target.files[0]));
  }
  // const [profile,setProfile] = useState({
  //     name: "Your Name",
  //     location: "City, Name",
  //     github: "",
  //     linkedin: "",
  //     website: "",
  //     position: "Your Position",
  //     tagline: "Describe yourself in one line"
  // })

  const handleProfile = (e) => {
    manageProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

    if (e.target.value === "" || e.target.value === null) {
      setAlertType({ ...alertType, [e.target.name]: true });
      handleAlertShow();
    } else {
      setAlertType({ ...alertType, [e.target.name]: false });
      handleAlertHide();
      if (e.target.name === "email") {
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
        ) {
          setEmailerror(false);
        } else setEmailerror(true);
      }
    }
    // setProfile((old)=>{
    //     return {
    //         ...old,
    //         [e.target.name]:e.target.value
    //     }
    // })
  };

  useEffect(() => {}, [alert, alertType, emailError]);

  const handleAlertHide = () => {
    setProfileName("");
    setProfileURL("");
    setAlert(false);
  };
  const handleAlertShow = (Profile, Link) => {
    setProfileName(Profile);
    setProfileURL(Link);
    setAlert(true);
  };

  const saveChanges = () => {
    console.log(alertType);

    if (!emailError && Object.values(alertType).every((v) => v === false)) {
      handleClose();
    }
  };

  return (
    <Fragment>
      <Row className="justify-content-center mt-2">
        <Col
          md={8}
          sm={12}
          className="d-flex justify-content-between align-items-center bg-light rounded"
        >
          <h5 className="m-0">Profile</h5>
          {!isEdit && (
            <MdAddCircleOutline
              size={30}
              className="rounded edit"
              onClick={handleShow}
            />
          )}
          {isEdit && (
            <MdEdit size={30} className="rounded edit" onClick={handleShow} />
          )}
        </Col>

        <Col md={8} sm={12}>
          {<p className="text-muted m-0">Name: {profile.name}</p>}
        </Col>
        <Col md={8} sm={12}>
          {<p className="text-muted m-0">Location: {profile.location}</p>}
        </Col>
        <Col md={8} sm={12}>
          {<p className="text-muted m-0">Github: {profile.github}</p>}
        </Col>
        <Col md={8} sm={12}>
          {<p className="text-muted m-0">Linkedin: {profile.linkedin}</p>}
        </Col>
        <Col md={8} sm={12}>
          {<p className="text-muted m-0">Website: {profile.website}</p>}
        </Col>
        <Col md={8} sm={12}>
          {<p className="text-muted m-0">Position: {profile.position}</p>}
        </Col>
        <Col md={8} sm={12}>
          {<p className="text-muted m-0">Tagline: {profile.tagline}</p>}
        </Col>

        <Modal show={show} onHide={handleClose} centered backdrop="static">
          <Modal.Header>
            <Modal.Title>Profile Details</Modal.Title>
            <MdClose size={30} className="rounded edit" onClick={handleClose} />
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  size="sm"
                  placeholder="Your Name"
                  value={profile.name}
                  onChange={handleProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="location"
                  size="sm"
                  placeholder="City, Country"
                  value={profile.location}
                  onChange={handleProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="position"
                  size="sm"
                  placeholder="Your Position"
                  value={profile.position}
                  onChange={handleProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="tagline"
                  size="sm"
                  placeholder="Describe yourself in one line"
                  value={profile.tagline}
                  onChange={handleProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  size="sm"
                  placeholder="Email Address"
                  value={profile.email}
                  onChange={handleProfile}
                />
                {emailError ? (
                  <div>
                    <span style={{ color: "#ff665b" }}>Invalid Email</span>
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  name="contact"
                  size="sm"
                  placeholder="Contact Number"
                  value={profile.contact}
                  onChange={handleProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="github"
                  size="sm"
                  placeholder="GitHub Profile"
                  value={profile.github}
                  onChange={handleProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="linkedin"
                  size="sm"
                  placeholder="LinkedIn Profile"
                  value={profile.linkedin}
                  onChange={handleProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="website"
                  size="sm"
                  placeholder="Your Portfolio Website"
                  value={profile.website}
                  onChange={handleProfile}
                />
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" size="sm" onChange={handleFile} />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <button
              type="submit"
              className="rounded edit px-2"
              onClick={saveChanges}
            >
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
        {/* <Modal show={alert} onHide={handleAlertHide}>
                    <Modal.Header>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{alertType.name ? "Name is required":null}</Modal.Body>

                </Modal> */}
      </Row>

      <ToastContainer className="p-3" position="top-end">
        {Object.keys(alertType).map((key) => {
          return (
            <>
              {alertType[key] ? (
                <Toast show={alert} onClose={handleAlertHide}>
                  <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">Error</strong>
                    <small className="text-muted">just now</small>
                  </Toast.Header>
                  <Toast.Body>{key} is required </Toast.Body>
                </Toast>
              ) : null}
            </>
          );
        })}
      </ToastContainer>
    </Fragment>
  );
}

export default Profile;
