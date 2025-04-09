import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function CoverLetterGenerator() {
  const [cvText, setCvText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setLoading(true);
    const prompt = `Write a cover letter based on this CV:\n${cvText}\nAnd this job description:\n${jobDesc}`;

    try {
      const res = await axios.post(
        // "https://themus.onrender.com/api/gpt/generate",
        "http://localhost:5000/api/gpt/generate",
        { prompt },
        {
          withCredentials: true, // ✅ Crucial
          headers: { "Content-Type": "application/json" },
        }
      );
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error calling GPT:", error);
      setResponse("Error getting response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="my-5 mb-3">
        <h2 className="text-center display-5 mb-4">AI Cover Letter Creator</h2>
        <p className="text-center fst-italic">
          Sometimes it's hard to know what to say.
        </p>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="cvInput">
              <Form.Label>Input your CV</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="jobDescInput">
              <Form.Label>Input the job description</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Generating..." : "Submit"}
            </Button>
          </Form>
          {response && (
            <div className="mt-4">
              <h4>Generated Cover Letter:</h4>
              <p>{response}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
