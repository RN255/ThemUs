import React from "react";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

export default function SingleDebate() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div>The title of this debate</div>
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
          <div className="col mx-1">
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Add a comment in opposition</Accordion.Header>
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
    </>
  );
}
