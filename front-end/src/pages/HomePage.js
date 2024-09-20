import React from "react";

import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import TopicList from "../components/TopicList";

function ContainerExample() {
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
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Main question</Form.Label>
                      <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Supporting comments</Form.Label>
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
        <div className="row">
          <div className="col">
            <TopicList></TopicList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContainerExample;
