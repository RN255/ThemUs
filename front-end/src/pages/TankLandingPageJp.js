import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Image,
  Nav,
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
    console.log("📤 Attempting to send email:", email);

    try {
      const res = await fetch("https://themus.onrender.com/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include", // ✅ Required for mobile sessions
      });

      console.log("✅ Response status:", res.status);

      const data = await res.json();
      console.log("✅ Response body:", data);

      alert(data.message || "Signed up!");
    } catch (err) {
      console.error("❌ Submission error:", err.message);
      alert("Something went wrong.");
    }
  };

  return (
    <div>
      <Container>
        <Nav variant="underline" defaultActiveKey="/SceneDoraJp">
          <Nav.Item>
            <Nav.Link href="/SceneDora" className="standardBlueColour">
              English
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/SceneDoraJp">日本語</Nav.Link>
          </Nav.Item>
        </Nav>
        <Row className="my-5">
          <Col className="d-flex flex-column">
            <h1 className="standardBlueColour">SceneDora</h1>
            <h2 className="fs-5 fst-italic">
              私たちは、画像共有ソーシャルメディアを変える新しいアプリを作っています。
            </h2>
            <ul className="list-unstyled mt-3">
              <li>
                <BsX size="1.75em" className="text-danger" />
                フォトショップなし
              </li>
              <li>
                <BsX size="1.75em" className="text-danger" />
                フィルターなし
              </li>
              <li>
                <BsX size="1.75em" className="text-danger" />
                自撮りなし
              </li>
              <li>
                <BsX size="1.75em" className="text-danger" />
                AIコンテンツなし
              </li>
              <li>
                <BsX size="1.75em" className="text-danger" />
                コメントなし
              </li>
            </ul>
            <p className="fs-5 fst-italic">
              これは、あなた、あなたの友達、あなたのご近所、そして世界のための写真共有アプリです。
            </p>

            <h2 className="standardBlueColour mt-2">仕組み</h2>
            <h3 className="fs-5 mt-3">
              <BsCamera size="1em" className="text-muted me-2" />
              フィルターなし、フォトショップなし
            </h3>
            <p>
              写真は必ずアプリを通じて撮影します。フォトライブラリからのアップロードや写真の編集はできません。本物の瞬間を、そのままに。
            </p>
            <h3 className="fs-5 mt-2">
              <BsBan size="1em" className="text-muted me-2" />
              コメントなし
            </h3>
            <p>
              写真にはコメントできません。だからネガティブな意見を気にする必要はありません。世界についての判断は自分で。SceneDoraでは、写真そのものが語ります。
            </p>
            <h3 className="fs-5 mt-2">
              <BsGlobe2 size="1em" className="text-muted me-2" />
              自撮りなし
            </h3>
            <p>
              写真はメインカメラで撮影します。自分の体験にフォーカスし、見たものを見せてください。あなたの目を通して、世界を見せてください。
            </p>

            <p className="standardBlueColour fs-4 mt-3 mb-0">
              フィルターのない世界を見よう。{" "}
            </p>
            <p className="standardBlueColour fs-4">
              SceneDoraのローンチ時に先行アクセスをゲット。
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
                  あなたのメールアドレスを他の誰とも共有することはありません。
                </Form.Text>
              </FloatingLabel>

              <Button variant="primary" type="submit">
                登録する
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
                現実の世界に一歩戻ってきてください。私たちはあなたを待っていました…。
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
            SceneDoraのローンチ時に先行アクセスをゲット。
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
                あなたのメールアドレスを他の誰とも共有しません。
              </Form.Text>
            </FloatingLabel>

            <Button variant="primary" type="submit">
              登録する
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}
