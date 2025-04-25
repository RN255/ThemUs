import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

export default function UserProfile() {
  // is signed in as user?
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [refreshUser, setRefreshUser] = useState(false); // 👈 trigger flag

  const [status, setStatus] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

        // 🧠 Optimistically update the local userDetails state
        setUserDetails((prev) => ({
          ...prev,
          subscriptionStatus: "cancelling",
        }));

        handleClose();
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
                {userDetails.plan === "premium" && (
                  <Card.Text className="mb-3">
                    Contact email: admin@themus.org
                  </Card.Text>
                )}
                {/* <Button variant="outline-primary" className="mb-2 w-100">
                Edit Profile
              </Button> */}
                {userDetails.plan === "free" && (
                  <Link to="/pricingCoverLetter">
                    <Button>Upgrade to Premium</Button>
                  </Link>
                )}
                {userDetails.plan === "premium" && (
                  <Button
                    variant={
                      userDetails.plan === "premium" &&
                      userDetails.subscriptionStatus === "active"
                        ? "danger"
                        : "primary"
                    }
                    className="w-100"
                    onClick={
                      userDetails.plan === "premium" &&
                      userDetails.subscriptionStatus === "active"
                        ? handleShow
                        : null
                    }
                    disabled={
                      userDetails.plan === "premium" &&
                      userDetails.subscriptionStatus === "cancelling"
                    }
                  >
                    {userDetails.plan === "premium" &&
                      userDetails.subscriptionStatus === "active" &&
                      "Cancel Subscription"}
                    {userDetails.plan === "premium" &&
                      userDetails.subscriptionStatus === "cancelling" &&
                      "Already Cancelling"}
                  </Button>
                )}
                {status && <Card.Text className="mt-3">{status}</Card.Text>}
                {userDetails?.subscriptionStatus === "cancelling" &&
                  userDetails.subscriptionEndsAt &&
                  !isNaN(new Date(userDetails.subscriptionEndsAt)) && (
                    <Card.Text className="mt-3">
                      Your subscription will end on{" "}
                      {new Date(
                        userDetails.subscriptionEndsAt
                      ).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      .
                    </Card.Text>
                  )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel your subscription?
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100">
            <Button variant="outline-primary" onClick={handleClose}>
              No, I don't want to cancel
            </Button>
            <Button variant="danger" onClick={handleCancel}>
              Yes, I want to cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
