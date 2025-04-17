import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function UserProfile() {
  // is signed in as user?
  const { user } = useAuth();

  if (!user) {
    return (
      <Container className="py-5">
        <h3 className="text-center">Please log in to view your profile</h3>
      </Container>
    );
  }

  return (
    <Container className="py-5 page-fade-in">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow">
            <Card.Body>
              {/* <Card.Img
                variant="top"
                src="https://via.placeholder.com/150"
                alt="User avatar"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              /> */}
              <Card.Title>{user.displayName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {user.email}
              </Card.Subtitle>
              <Card.Text className="mb-3">
                Plan: <strong>{user.plan}</strong>
              </Card.Text>

              {/* <Button variant="outline-primary" className="mb-2 w-100">
                Edit Profile
              </Button> */}
              <Button
                variant={user.plan === "premium" ? "danger" : "primary"}
                className="w-100"
                onClick={
                  user.plan === "premium"
                    ? () => console.log("Cancel subscription")
                    : () => console.log("Upgrade to premium")
                }
              >
                {user.plan === "premium"
                  ? "Cancel Subscription"
                  : "Upgrade to Premium"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
