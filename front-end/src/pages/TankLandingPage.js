import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Image,
} from "react-bootstrap";

import SeoulImg from "../assets/IMG_1322.JPEG";
import landImg1 from "../assets/landImg1.JPEG";
import landImg2 from "../assets/landImg2.JPEG";
import landImg3 from "../assets/landImg3.jpg";
import landImg4 from "../assets/landImg4.JPEG";
import landImg5 from "../assets/landImg5.JPG";
import landImg6 from "../assets/landImg6.jpg";

import { BsCamera, BsBan, BsGlobe2, BsX } from "react-icons/bs";

const features = [
  {
    title: "No filter, No photoshop",
    icon: <BsCamera size="1.75em" className="text-muted" />,
    text: "Users can only take photos through the app. You can't upload from your photo library and you can't edit photos.",
  },
  {
    title: "No comments",
    icon: <BsBan size="1.75em" className="text-muted" />,
    text: "Users can't comment on photos so you don't have to listen to the negativity. Make your own judgments about the world.",
  },
  {
    title: "No selfies",
    icon: <BsGlobe2 size="1.75em" className="text-muted" />,
    text: "Users can only use the main camera. Focus on your experiences and show us what you see.",
  },
];

const images = [{ image: landImg1 }, { image: landImg2 }, { image: landImg3 }];
const images2 = [{ image: landImg4 }, { image: landImg5 }, { image: landImg6 }];

export default function TankLandingPage() {
  // Collect the email
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      alert(data.message || "Signed up!");
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <Container>
        <Row className="my-5">
          <Col className="d-flex flex-column">
            <h1 className="standardBlueColour">LUMI</h1>
            <h2 className="fs-5 fst-italic">
              We are creating a new app to change image sharing social media.
            </h2>
            <ul className="list-unstyled mt-3">
              <li>
                <BsX size="1.75em" className="text-danger" />
                No photoshop
              </li>
              <li>
                <BsX size="1.75em" className="text-danger" />
                No filter
              </li>
              <li>
                <BsX size="1.75em" className="text-danger" />
                No selfies
              </li>
              <li>
                <BsX size="1.75em" className="text-danger" />
                No comments
              </li>
            </ul>
            <p className="fs-5 fst-italic">
              A photo sharing app for you, your friends, your neighbourhood —
              and the world.
            </p>

            <h2 className="standardBlueColour mt-2">How it works</h2>
            <h3 className="fs-5 mt-3">
              <BsCamera size="1em" className="text-muted me-2" />
              No filter, No photoshop
            </h3>
            <p>
              Photos must be taken through the app. You can't upload from your
              photo library and you can't edit photos. Just real moments, as
              they happen.
            </p>
            <h3 className="fs-5 mt-2">
              <BsBan size="1em" className="text-muted me-2" />
              No comments
            </h3>
            <p>
              Users can't comment on photos so you don't have to listen to the
              negativity. Make your own judgments about the world. LUMI lets the
              image speak for itself.
            </p>
            <h3 className="fs-5 mt-2">
              <BsGlobe2 size="1em" className="text-muted me-2" />
              No selfies
            </h3>
            <p>
              Photos must be taken through the main camera. Focus on your
              experiences and show us what you see. Show us the world through
              your eyes.
            </p>

            <p className="standardBlueColour fs-4 mt-3 mb-0">
              See the world, unfiltered.{" "}
            </p>
            <p className="standardBlueColour fs-4">
              Get early access to LUMI when we launch.
            </p>
            <Form>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" />
                <Form.Text className="text-muted ms-1">
                  We'll never share your email with anyone else.
                </Form.Text>
              </FloatingLabel>

              <Button variant="primary" type="submit">
                Sign me up
              </Button>
            </Form>
          </Col>
          <Col className="d-none d-xl-flex justify-content-center align-items-center">
            <Image
              src={SeoulImg}
              className="img-fluid p-5"
              // style={{ height: "50vh" }}
            ></Image>
          </Col>
        </Row>
        {/* <Row className="mt-5">
          <Col>
            <h2>How it works</h2>
          </Col>
        </Row> */}
        {/* <Row xs={1} sm={2} md={3} className="g-4 mb-5">
          {features.map((feature, index) => (
            <Col key={index}>
              <div
                className="mb-3"
                style={{ width: "1.75em", height: "1.75em" }}
              >
                {feature.icon}
              </div>
              <div>
                <h5 className="fw-bold mb-3">{feature.title}</h5>
                <p>{feature.text}</p>
              </div>
            </Col>
          ))}
        </Row> */}
        <Row xs={1} sm={2} md={3} className="g-4 mt-5 pt-5">
          {images.map((image, index) => (
            <Col key={index} className="d-flex justify-content-center">
              <Image
                src={image.image}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                }}
              ></Image>
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="text-center my-5 py-5">
            <h3 className="lead fs-4">
              <em>
                Take a step back towards the real world. We've been waiting for
                you...
              </em>
            </h3>
          </Col>
        </Row>
        <Row xs={1} sm={2} md={3} className="g-4">
          {images2.map((image, index) => (
            <Col key={index} className="d-flex justify-content-center">
              <Image
                src={image.image}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                }}
              ></Image>
            </Col>
          ))}
        </Row>
        <Row className="my-5">
          <p className="standardBlueColour fs-4 mt-2">
            Get early access to LUMI when we launch.
          </p>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted ms-1">
                We'll never share your email with anyone else.
              </Form.Text>
            </FloatingLabel>

            <Button variant="primary" type="submit">
              Sign me up
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}
