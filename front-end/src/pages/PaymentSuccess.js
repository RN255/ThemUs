import React from "react";
import { Container } from "react-bootstrap";

export default function PaymentSuccess() {
  return (
    <Container>
      <div style={{ padding: "2rem" }}>
        <h1>✅ Payment successful!</h1>
        <p>
          Thank you! Your premium access is now active (or will be shortly).
        </p>
      </div>
    </Container>
  );
}
