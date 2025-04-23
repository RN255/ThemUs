import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export default function UserProfile() {
  // is signed in as user?
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [refreshUser, setRefreshUser] = useState(false); // 👈 trigger flag

  const [status, setStatus] = useState(null);

  const handleCancel = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/cancel-subscription",
        {},
        { withCredentials: true }
      );

      if (res.data.message) {
        setStatus(
          "Your subscription will be canceled at the end of the billing period."
        );
      }
    } catch (err) {
      console.error("Error cancelling subscription:", err);
      setStatus("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user || !user._id) return;

      try {
        const res = await axios.get(`http://localhost:5000/users/${user._id}`, {
          withCredentials: true,
        });
        setUserDetails(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to get user", err);
      }
    };

    fetchUserDetails();
  }, [refreshUser, user]); // Refresh when either `user` or `refreshUser` changes

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
          {userDetails && (
            <Card className="text-center shadow">
              <Card.Body>
                {/* <Card.Img
                variant="top"
                src="https://via.placeholder.com/150"
                alt="User avatar"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              /> */}
                <Card.Title>{userDetails.displayName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {userDetails.email}
                </Card.Subtitle>
                <Card.Text className="mb-3">
                  Plan: <strong>{userDetails.plan}</strong>
                </Card.Text>

                {/* <Button variant="outline-primary" className="mb-2 w-100">
                Edit Profile
              </Button> */}
                <Button
                  variant={
                    userDetails.plan === "premium" ? "danger" : "primary"
                  }
                  className="w-100"
                  onClick={
                    userDetails.plan === "premium"
                      ? handleCancel
                      : () => console.log("Upgrade to premium")
                  }
                >
                  {userDetails.plan === "premium"
                    ? "Cancel Subscription"
                    : "Upgrade to Premium"}
                </Button>
                {status && <p>{status}</p>}
                <p>
                  {userDetails?.subscriptionStatus === "cancelling" && (
                    <p>
                      Your subscription will end on{" "}
                      {new Date(
                        userDetails.subscriptionEndsAt
                      ).toLocaleDateString()}
                      .
                    </p>
                  )}
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
