import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export default function SingleDebate() {
  const { id } = useParams();
  const [entry, setEntry] = useState({});
  const [forComments, setForComments] = useState([]);
  const [againstComments, setAgainstComments] = useState([]);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  //  get topic from database
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/entries/entries/${id}`)
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
      .get(`http://localhost:5000/api/comments/comments/${id}`)
      .then((response) => {
        // Separate comments into "for" and "against"
        const forComments = response.data.filter(
          (comment) => comment.type === "support"
        );
        const againstComments = response.data.filter(
          (comment) => comment.type === "oppose"
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
    e.preventDefault();

    // Set type to either "support" or "oppose" depending on the form
    const updatedFormData = { ...supportFormData, type };

    axios
      .post("http://localhost:5000/api/comments/comments", updatedFormData)
      .then((response) => {
        console.log("Comment submitted:", response.data);
        // Optionally reset the form after submission
        setSupportFormData({ commentText: "", entry: id, type: "" });
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
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
    e.preventDefault();

    // Set type to either "support" or "oppose" depending on the form
    const updatedFormData = { ...opposeFormData, type };

    axios
      .post("http://localhost:5000/api/comments/comments", updatedFormData)
      .then((response) => {
        console.log("Comment submitted:", response.data);
        // Optionally reset the form after submission
        setOpposeFormData({ commentText: "", entry: id, type: "" });
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };

  return (
    <>
      {dataLoaded ? (
        <div className="container">
          <div className="row">
            <div className="col">
              <p>{entry.topicTitle}</p>
              <p>{entry.topicDescription}</p>
              <p>{formatDate(entry.dateCreated)}</p>
            </div>
          </div>
          <div className="row">
            <div className="col bg-primary mx-1">
              <div>Yes</div>
            </div>
            <div className="col bg-danger mx-1">
              <div>No</div>
            </div>
          </div>
          <div className="row">
            <div className="col mx-1">
              <ul>
                <li>First comment</li>
                <li>Second comment</li>
                <li>Third comment</li>
              </ul>
            </div>
            <div className="col mx-1">
              <ul>
                <li>First comment</li>
                <li>Second comment</li>
                <li>Third comment</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col mx-1">
              <Accordion flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Add a comment in favour</Accordion.Header>
                  <Accordion.Body>
                    <Form
                      onSubmit={(e) =>
                        submitSupportCommentToDatabase(e, "support")
                      }
                    >
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="commentText"
                          onChange={handleSupportChange}
                          value={supportFormData.commentText}
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
            <div className="col mx-1">
              <Accordion flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Add a comment in opposition
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form
                      onSubmit={(e) =>
                        submitOpposeCommentToDatabase(e, "oppose")
                      }
                    >
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="commentText"
                          onChange={handleOpposeChange}
                          value={opposeFormData.commentText}
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
          <div className="row">
            <div className="col">
              <ul>
                {forComments.map((comment) => (
                  <li key={comment._id}>
                    <p>{comment.commentText}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col">
              <ul>
                {againstComments.map((comment) => (
                  <li key={comment._id}>
                    <p>{comment.commentText}</p>
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
