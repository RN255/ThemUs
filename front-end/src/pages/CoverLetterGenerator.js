import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function CoverLetterGenerator() {
  const [cvText, setCvText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [refreshUser, setRefreshUser] = useState(false); // 👈 trigger flag

  // is signed in as user?
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user || !user._id) return; // 👈 wait until user is available

      try {
        const res = await axios.get(`http://localhost:5000/users/${user._id}`, {
          withCredentials: true,
        });
        setUserDetails(res.data); // 👈 no .user unless your route nests it
        console.log(res.data);
      } catch (err) {
        console.error("Failed to get user", err);
      }
    };

    fetchUserDetails();
  }, [refreshUser, user]); // 👈 include user in dependencies

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

    setRefreshUser((prev) => !prev); // 👈 toggle to re-trigger useEffect
  };

  return (
    <Container>
      {userDetails && <p>{userDetails.displayName}</p>}
      {userDetails && <p>{userDetails.usedLetters}</p>}
      {userDetails && <p>{userDetails.letterLimit}</p>}
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
