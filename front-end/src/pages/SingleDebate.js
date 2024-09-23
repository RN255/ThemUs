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
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

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

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // spinner logic
  const [dataLoaded, setDataLoaded] = useState(false);

  //logic to submit a comment
  const [formData, setFormData] = useState({
    commentText: "",
    entry: id,
  });

  // Handler function to update the form data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitCommentToDatabase = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/comments/comments", formData)
      .then((response) => {
        console.log("I sent.");
        // setFormData({
        //   commentText: "",
        // });
      })
      .catch((error) => {
        console.log(formData.commentText);
        console.log(formData.entry);
        console.log("Did not send.");

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
                    <Form onSubmit={submitCommentToDatabase}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="commentText"
                          onChange={handleChange}
                          value={formData.commentText}
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
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control as="textarea" rows={3} />
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
