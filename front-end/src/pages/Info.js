import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";

export default function Info() {
  return (
    <Container className="py-5 page-fade-in">
      <Row className="justify-content-center">
        <Col>
          <h1 className="blueText">Welcome to Them Us Nexus</h1>
          <p className="mt-4">
            The world is evolving — and that's something to embrace, not fear.
            At Them Us Nexus, we believe in a future where humans and computers
            collaborate, not compete. Together, we can unlock new possibilities,
            simplify the complex, and build a better tomorrow — side by side
            with the tools that are shaping it.
          </p>
          <p>Keep coming back for improvements and new features.</p>
          <p>
            {" "}
            Contact email: <span className="fst-italic">admin@themus.org</span>
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col>
          <Card className="p-4 shadow rounded-3">
            <Card.Body>
              <h1 className="mb-4">Privacy Policy</h1>
              <p>
                <strong>Effective Date:</strong> 25th April 2025
              </p>

              <p>
                At <strong>Them Us Nexus</strong>, we value your privacy and are
                committed to protecting your information. This Privacy Policy
                explains how we collect, use, and store your data when you use
                our website and services.
              </p>

              <h3 className="mt-4">Information We Collect</h3>
              <ul>
                <li>
                  <strong>Account Information:</strong> We collect and store
                  basic account details such as your name, email address, and
                  login status.
                </li>
                <li>
                  <strong>Local Storage:</strong> We use your browser’s local
                  storage to keep you logged in and improve your experience. No
                  sensitive personal information is stored without your consent.
                </li>
              </ul>

              <h3 className="mt-4">How We Use Your Information</h3>
              <ul>
                <li>To keep you signed in securely.</li>
                <li>To personalize and improve your experience on our site.</li>
                <li>To provide access to services you have requested.</li>
              </ul>

              <h3 className="mt-4">How We Store Your Information</h3>
              <p>
                Login information and session data are stored securely in your
                browser’s local storage. We do not sell, rent, or share your
                information with third parties for marketing purposes.
              </p>

              <h3 className="mt-4">Cookies and Tracking</h3>
              <p>
                We do <strong>not</strong> use third-party tracking cookies or
                advertising cookies. We only use local storage for essential
                functionality, such as maintaining your login session.
              </p>

              <h3 className="mt-4">Your Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>
                  Request access to the personal information we hold about you.
                </li>
                <li>Request correction or deletion of your data.</li>
                <li>
                  Withdraw your consent at any time by logging out and clearing
                  your local storage.
                </li>
              </ul>
              <p>
                If you have any questions or concerns about your data, you can
                contact us at:
                <br />
                <strong>admin@themus.org</strong>
              </p>

              <h3 className="mt-4">Changes to This Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. We
                encourage you to review it periodically. Any changes will be
                posted on this page.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
