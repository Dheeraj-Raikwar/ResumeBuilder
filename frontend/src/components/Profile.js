import React, { Fragment, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdEdit, MdClose } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Table from "react-bootstrap/Table";

// Profile Component
function Profile() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { manageProfile, manageFile } = bindActionCreators(
    actionCreators,
    dispatch
  ); // to perform action on profile state


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


  const [emailError, setEmailerror] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleFile(e) {
    manageFile(URL.createObjectURL(e.target.files[0]));
  }

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
  };

  useEffect(() => {}, [alert]);

  const handleAlertHide = () => {
    setAlert(false);
  };
  const handleAlertShow = () => {
    
    setAlert(true);
  };

  const saveChanges = () => {
    console.log(alertType);

    var isAllFalse = true;

    for (const key in alertType) {

      if(alertType[key]===true){
      isAllFalse = false
      break
      }

    }

    if (!emailError && isAllFalse) {
      handleClose();
    }
  };

  return (
    <Fragment>
      <Row className="justify-content-center mt-2">
        <Col
          md={8}
          sm={12}
          className="d-flex justify-content-between align-items-center bg-secondary bg-gradient rounded"
        >
          <h6 className="m-0">Profile</h6>
          {
            <MdEdit size={30} className="rounded edit" onClick={handleShow} />
          }
          
        </Col>

        <Col md={8} sm={12}>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>location</th>
                <th>github</th>
                <th>linkedin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>-</th>
                <td>{profile.name}</td>
                <td>{profile.location}</td>
                <td>{profile.github}</td>
                <td>{profile.linkedin}</td>
              </tr>
            </tbody>
          </Table>

          <Table responsive="md">
            <thead>
              <tr>
                <th>#</th>
                <th>website</th>
                <th>position</th>
                <th>tagline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>-</th>
                <td>{profile.website}</td>
                <td>{profile.position}</td>
                <td>{profile.tagline}</td>
              </tr>
            </tbody>
          </Table>
        </Col>

        <Modal show={show} onHide={handleClose} centered backdrop="static">
          <Modal.Header>
            <Modal.Title>
              <h6>Profile Details</h6>
            </Modal.Title>
            <MdClose size={30} className="rounded edit" onClick={handleClose} />
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Full Name</h6>
                </Form.Label>
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
                <Form.Label>
                  <h6>Location</h6>
                </Form.Label>
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
                <Form.Label>
                  <h6>Position</h6>
                </Form.Label>
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
                <Form.Label>
                  <h6>Description</h6>
                </Form.Label>
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
                <Form.Label>
                  <h6>Email</h6>
                </Form.Label>
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
                <Form.Label>
                  <h6>Mobile No.</h6>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="contact"
                  size="sm"
                  placeholder="815-561-9082"
                  value={profile.contact}
                  onChange={handleProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Github Link</h6>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="github"
                  size="sm"
                  placeholder="https://github.com/"
                  value={profile.github}
                  onChange={handleProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Linkedin Link</h6>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="linkedin"
                  size="sm"
                  placeholder="https://www.linkedin.com/"
                  value={profile.linkedin}
                  onChange={handleProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Website URL</h6>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="website"
                  size="sm"
                  placeholder="www.mywebsite.com"
                  value={profile.website}
                  onChange={handleProfile}
                />
              </Form.Group>
              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>
                  <h6>Profile Picture</h6>
                </Form.Label>
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
              <h6> Save Changes</h6>
            </button>
          </Modal.Footer>
        </Modal>
      </Row>

      <ToastContainer className="p-3" position="bottom-end">
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
