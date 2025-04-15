import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import {
  BsBootstrap,
  BsCpuFill,
  BsCalendar3,
  BsHouse,
  BsSpeedometer2,
  BsToggles2,
  BsGeoFill,
  BsTools,
} from "react-icons/bs";

const features = [
  {
    title: "British English",
    icon: <BsBootstrap size="1.75em" className="text-muted" />,
    text: "Create cover letters using British English.",
  },
  {
    title: "Avoids AI speak",
    icon: <BsCpuFill size="1.75em" className="text-muted" />,
    text: "Avoids common and repetitive AI phrases that stand out as not being genuine.",
  },
  {
    title: "Featured title",
    icon: <BsCalendar3 size="1.75em" className="text-muted" />,
    text: "You can really do something good here and it's going to be great.",
  },
  {
    title: "3 free letters/month",
    icon: <BsHouse size="1.75em" className="text-muted" />,
    text: "Pay for more if you want them.",
  },
];

export default function LetterGeneratorFeatures() {
  return (
    <Container className="py-5">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {features.map((feature, index) => (
          <Col key={index} className="d-flex align-items-start">
            <div className="me-3" style={{ width: "1.75em", height: "1.75em" }}>
              {feature.icon}
            </div>
            <div>
              <h5 className="fw-bold mb-0">{feature.title}</h5>
              <p>{feature.text}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
