import React from "react";
import { Container } from "react-bootstrap";

export default function PaymentCancel() {
  return (
    <Container>
      <div style={{ padding: "2rem" }}>
        <h1>Payment Cancelled!</h1>
        <p>Please go back to your business.</p>
      </div>
    </Container>
  );
}
