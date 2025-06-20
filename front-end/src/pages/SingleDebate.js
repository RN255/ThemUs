import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import leftArrow from "../assets/left-arrow-icon.png";

export default function SingleDebate() {
  const { id } = useParams();
  const [entry, setEntry] = useState({});
  const [forComments, setForComments] = useState([]);
  const [againstComments, setAgainstComments] = useState([]);
  const navigate = useNavigate();
  const [showMessageFor, setShowMessageFor] = useState(false);
  const [showMessageAgainst, setShowMessageAgainst] = useState(false);
  const [validatedFor, setValidatedFor] = useState(false);
  const [validatedAgainst, setValidatedAgainst] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  //  get topic from database
  useEffect(() => {
    axios
      .get(`https://themus.onrender.com/api/entries/entries/${id}`)
      .then((response) => {
        setEntry(response.data);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  //  get comments from database
  useEffect(() => {
    axios
      .get(`https://themus.onrender.com/api/comments/comments/${id}`)
      .then((response) => {
        // Separate comments into "for" and "against"
        const forComments = response.data.filter(
          (comment) => comment.type === "support" && comment.approved
        );
        const againstComments = response.data.filter(
          (comment) => comment.type === "oppose" && comment.approved
        );

        // Set state for both types of comments
        setForComments(forComments);
        setAgainstComments(againstComments);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // spinner logic
  const [dataLoaded, setDataLoaded] = useState(false);

  //logic to submit a SUPPORT comment
  const [supportFormData, setSupportFormData] = useState({
    commentText: "",
    entry: id,
    type: "",
  });

  // Handler function to update the form data
  const handleSupportChange = (e) => {
    setSupportFormData({ ...supportFormData, [e.target.name]: e.target.value });
  };

  const submitSupportCommentToDatabase = (e, type) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidatedFor(true);
    } else {
      e.preventDefault();
      // Set type to either "support" or "oppose" depending on the form
      const updatedFormData = { ...supportFormData, type };

      axios
        .post(
          "https://themus.onrender.com/api/comments/comments",
          updatedFormData
        )
        .then((response) => {
          console.log("Comment submitted:", response.data);
          // Optionally reset the form after submission
          setSupportFormData({ commentText: "", entry: id, type: "" });
          setValidatedFor(false);
          setShowMessageFor(true); // Show the message when submitted
        })
        .catch((error) => {
          console.error("Error submitting comment:", error);
        });
    }

    // Hide the message after 3 seconds
    setTimeout(() => setShowMessageFor(false), 3000);
  };

  //logic to submit an OPPOSE comment
  const [opposeFormData, setOpposeFormData] = useState({
    commentText: "",
    entry: id,
    type: "",
  });

  // Handler function to update the form data
  const handleOpposeChange = (e) => {
    setOpposeFormData({ ...opposeFormData, [e.target.name]: e.target.value });
  };

  const submitOpposeCommentToDatabase = (e, type) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidatedAgainst(true);
    } else {
      e.preventDefault();

      // Set type to either "support" or "oppose" depending on the form
      const updatedFormData = { ...opposeFormData, type };

      axios
        .post(
          "https://themus.onrender.com/api/comments/comments",
          updatedFormData
        )
        .then((response) => {
          console.log("Comment submitted:", response.data);
          // Optionally reset the form after submission
          setOpposeFormData({ commentText: "", entry: id, type: "" });
          setValidatedAgainst(false);
          setShowMessageAgainst(true); // Show the message when submitted
        })
        .catch((error) => {
          console.error("Error submitting comment:", error);
        });
    }

    // Hide the message after 3 seconds
    setTimeout(() => setShowMessageAgainst(false), 3000);
  };

  return (
    <>
      {dataLoaded ? (
        <div className="container mt-4 mb-5">
          <div className="row">
            <div className="col">
              <Button
                variant="link"
                className="text-decoration-none blackText mb-2 ps-0 py-1 backButtonHover"
                onClick={goBack}
              >
                <p className="d-flex align-items-center m-0">
                  <img
                    src={leftArrow}
                    alt="back angle icon"
                    className="heightOneRem p-0 me-1"
                  />
                  Back
                </p>
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>{formatDate(entry.dateCreated)}</p>
              <h1>{entry.topicTitle}</h1>
              <p className="displayLineBreaks mt-4">{entry.topicDescription}</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col mx-2 blueBackground">
              <p className="my-0 py-2">Acknowledge</p>
            </div>
            <div className="col mx-2 redBackground">
              <p className="my-0 py-2">Dissent</p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col p-0 mx-2">
              <Accordion flush className="blueBorder">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Add a supporting comment</Accordion.Header>
                  <Accordion.Body className="px-1 px-md-4">
                    <Form
                      noValidate
                      validated={validatedFor}
                      onSubmit={(e) =>
                        submitSupportCommentToDatabase(e, "support")
                      }
                    >
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          required
                          as="textarea"
                          rows={3}
                          name="commentText"
                          onChange={handleSupportChange}
                          value={supportFormData.commentText}
                          className={
                            supportFormData.commentText.length > 3000
                              ? "is-invalid"
                              : ""
                          }
                        />
                        {showMessageFor && (
                          <Form.Text className="text-muted">
                            comment submitted
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="col p-0 mx-2">
              <Accordion flush className="redBorder">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Add a critical comment</Accordion.Header>
                  <Accordion.Body className="px-1 px-md-4">
                    <Form
                      noValidate
                      validated={validatedAgainst}
                      onSubmit={(e) =>
                        submitOpposeCommentToDatabase(e, "oppose")
                      }
                    >
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          required
                          as="textarea"
                          rows={3}
                          name="commentText"
                          onChange={handleOpposeChange}
                          value={opposeFormData.commentText}
                          className={
                            opposeFormData.commentText.length > 3000
                              ? "is-invalid"
                              : ""
                          }
                        />
                        {showMessageAgainst && (
                          <Form.Text className="text-muted">
                            comment submitted
                          </Form.Text>
                        )}
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
          <div className="row mt-4">
            <div className="col p-0 mx-2">
              <ul className="noBullet noPadding">
                {forComments.map((comment) => (
                  <li key={comment._id} className="rounded my-3 p-2 blueBorder">
                    <p className="displayLineBreaks mx-0 mx-sm-2 my-2">
                      {comment.commentText}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col p-0 mx-2">
              <ul className="noBullet noPadding">
                {againstComments.map((comment) => (
                  <li key={comment._id} className="redBorder rounded my-3 p-2">
                    <p className="displayLineBreaks mx-0 mx-sm-2 my-2">
                      {comment.commentText}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        // Display the Spinner while data is loading
        <div className="container">
          <div className="row">
            <div className="col mt-5">
              <Spinner animation="grow" variant="info" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
