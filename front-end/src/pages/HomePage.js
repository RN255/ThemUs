import React, { useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import PaginatedTopicList from "../components/PaginatedTopicList";

import axios from "axios";
import RssFeedSample from "../components/RssFeedSample";
import RssFeedSampleBBC from "../components/RssFeedSampleBBC";

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
      .post("https://themus.onrender.com/api/entries/entries", formData)
      .then((response) => {
        console.log("Comment submitted:", response.data);
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
    <div className="container-fluid mb-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <Accordion flush className="my-4 purpleBorder ">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Latest news about ThemUs</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li>The website had been launched.</li>
                    <li>Sorry if things are slow.</li>
                    <li>Sorry if not all topics or comments are accepted.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Accordion flush className="mb-4 greenBorder ">
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
                      <Form.Label>Main proposition</Form.Label>
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
                      {/* <Form.Text className="text-muted">
                        Propositions should allow for an "agree" or "disagree"
                        debate. Eg. Cannabis should be legalized. Climate change
                        is not real...
                      </Form.Text> */}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Supporting comments</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        style={{ height: "200px" }}
                        name="topicDescription"
                        value={formData.topicDescription}
                        onChange={handleChange}
                        className={
                          formData.topicDescription.length > 3000
                            ? "is-invalid"
                            : ""
                        }
                      />
                      <Form.Text className="text-muted">
                        Limit: 3000 characters
                      </Form.Text>
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

      <div className="container-fluid border">
        <div className="row">
          <div className="col">
            <RssFeedSample></RssFeedSample>
          </div>
          <div className="col">
            <RssFeedSampleBBC></RssFeedSampleBBC>
          </div>
          <div className="col">
            <RssFeedSample></RssFeedSample>
          </div>
          <div className="col">
            <RssFeedSample></RssFeedSample>
          </div>
          <div className="col">
            <RssFeedSample></RssFeedSample>
          </div>
        </div>
      </div>

      <Modal
        show={showPreview}
        onHide={handleClosePreview}
        animation={false}
        // dialogClassName="modal-80w"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="m-1">Please review</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="blueText p-0 mx-0 mt-2 mb-4">
                  {formData.topicTitle}
                </h2>
                <p className="m-0 mb-4 onePointTwoRem normalWeight d-flex align-items-center displayLineBreaks">
                  {formData.topicDescription}
                </p>
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
        <Modal.Body>Your topic suggestion is in review.</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomePage;
