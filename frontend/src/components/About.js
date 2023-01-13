import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdAddCircleOutline, MdEdit, MdClose } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";

// About component
function About() {
  const about = useSelector((state) => state.about);
  const dispatch = useDispatch();
  const { manageAbout } = bindActionCreators(actionCreators, dispatch); // to perform action on about state

  const [isEdit, setIsEdit] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleAbout = (e) => {
    const valid = e.currentTarget;
    if (!valid.checkValidity()) {
      setValidated(true);
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
    manageAbout(e.target.value);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
  };
  const handleShow = () => setShow(true);

  return (
    <Row className="justify-content-center mt-2">
      <Col
        md={8}
        sm={12}
        className="d-flex justify-content-between align-items-center bg-info bg-gradient rounded"
      >
        <h6 className="m-0">About</h6>
        {!isEdit && (
          <MdEdit size={30} className="rounded edit" onClick={handleShow} />
        )}
        {isEdit && (
          <MdEdit size={30} className="rounded edit" onClick={handleShow} />
        )}
      </Col>
      <Col md={8} sm={12}>
        {about && <p className="py-2 text-break">{about}</p>}
      </Col>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>
            <h6>About</h6>
          </Modal.Title>
          <MdClose size={30} className="rounded edit" onClick={handleClose} />
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3">
              <Form.Control
                required
                as="textarea"
                rows={6}
                placeholder="Write about yourself"
                value={about}
                onChange={handleAbout}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="submit"
            className="rounded edit px-2"
            onClick={handleClose}
          >
            <h6>Save Changes</h6>
          </button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

export default About;
