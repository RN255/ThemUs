import React, { useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import PaginatedTopicList from "../components/PaginatedTopicList";

import axios from "axios";

function HomePage() {
  const topOfList = useRef();

  const [formData, setFormData] = useState({
    topicTitle: "",
    topicDescription: "",
  });

  const [validated, setValidated] = useState(false);

  // preview modal
  const [showPreview, setShowPreview] = useState(false);

  const handleClosePreview = () => setShowPreview(false);
  const handleShowPreview = () => setShowPreview(true);

  // modal stuff
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // Handler function to update the form data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler function for form submission
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      handleShowPreview();
    }
  };

  const submitDataToDatabase = () => {
    axios
      .post("http://localhost:5000/api/entries/entries", formData)
      .then((response) => {
        setFormData({
          topicTitle: "",
          topicDescription: "",
        });
        setValidated(false);
        handleShow();
        // console.log(formData);
      })
      .catch((error) => {
        console.log("Did not send.");
      });
    handleClosePreview();
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col">
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Suggest a new discussion topic
                </Accordion.Header>
                <Accordion.Body>
                  <Form
                    id="my-form"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Main question</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="topicTitle"
                        value={formData.topicTitle}
                        onChange={handleChange}
                        className={
                          formData.topicTitle.length > 150 ? "is-invalid" : ""
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Supporting comments</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        style={{ height: "100px" }}
                        name="topicDescription"
                        value={formData.topicDescription}
                        onChange={handleChange}
                        className={
                          formData.topicDescription.length > 500
                            ? "is-invalid"
                            : ""
                        }
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <PaginatedTopicList topOfList={topOfList}></PaginatedTopicList>
      </div>

      <Modal
        show={showPreview}
        onHide={handleClosePreview}
        backdrop="static"
        keyboard={false}
        animation={false}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="m-1">Please review</p>
            <p className="m-1 text-secondary oneRem">
              This is how your advert will appear on the website
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="blueText p-0 mx-0 mt-2 mb-2">
                  {formData.topicTitle}
                </h2>
                <h3 className="m-0 onePointTwoRem normalWeight d-flex align-items-center">
                  {formData.topicDescription}
                </h3>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="marginAutoMobile">
          <Button variant="secondary" onClick={handleClosePreview}>
            Make changes
          </Button>
          <Button onClick={submitDataToDatabase}>Confirm and submit</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Thank you</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your job will be checked and then posted online.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomePage;
