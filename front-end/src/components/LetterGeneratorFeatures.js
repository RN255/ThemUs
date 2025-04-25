import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import {
  BsBlockquoteLeft,
  BsCalendar2Date,
  BsClipboardCheck,
} from "react-icons/bs";
import unionFlagIcon from "../assets/union_jack_icon.png";

const features = [
  {
    title: "British English",
    icon: (
      <img
        src={unionFlagIcon}
        alt="UK flag"
        style={{
          width: "1.75em",
          height: "1.75em",
          objectFit: "contain",
          display: "block",
          filter: "grayscale(100%)",
        }}
      />
    ),
    text: "Create cover letters using British English.",
  },
  {
    title: "Tailored for You",
    icon: <BsBlockquoteLeft size="1.75em" className="text-muted" />,
    text: "Written in a formal but enthusiastic tone, showing genuine interest in the role.",
  },
  {
    title: "Professional but Personal",
    icon: <BsClipboardCheck size="1.75em" className="text-muted" />,
    text: "Uses confident, natural language — avoids clichés or overly generic statements.",
  },
  {
    title: "3 free letters/month",
    icon: <BsCalendar2Date size="1.75em" className="text-muted" />,
    text: "Subscribe to the premium plan for more letters.",
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
