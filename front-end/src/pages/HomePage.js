import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TopicList from "../components/TopicList";

function ContainerExample() {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col border">
            <TopicList></TopicList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContainerExample;
