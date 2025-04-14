import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

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

      const generatedLetter = res.data.response;
      setResponse(generatedLetter);

      // ✅ NOW: Save the GPT-generated cover letter to MongoDB
      await axios.post(
        "http://localhost:5000/api/coverLetters",
        {
          userId: user._id, // 👈 Make sure `user` is available in context/state
          content: generatedLetter,
          jobTitle: null, // optional, if you're capturing it
          company: null, // optional
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
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
      <Nav variant="underline" defaultActiveKey="/coverLetterGenerator">
        <Nav.Item>
          <Nav.Link href="/coverLetterGenerator">Create</Nav.Link>
        </Nav.Item>
        {user && (
          <Nav.Item>
            <Nav.Link href="/previousLetters" className="standardBlueColour">
              Letter History
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
      <Row className="my-5 mb-3">
        <Col>
          <h2 className="text-center display-5 mb-4">
            AI Cover Letter Creator
          </h2>
          <p className="text-center fst-italic">
            Sometimes it's hard to know what to say.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="fst-italic">
          Number of letters used:{" "}
          {userDetails ? (
            userDetails.usedLetters >= userDetails.letterLimit ? (
              <p className="text-danger d-inline">
                {userDetails.usedLetters}/{userDetails.letterLimit}
              </p>
            ) : (
              <p className="text-success d-inline">
                {userDetails.usedLetters}/{userDetails.letterLimit}
              </p>
            )
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="cvInput">
              <Form.Label>Put your CV in here:</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="jobDescInput">
              <Form.Label>Put the job description in here:</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </Form.Group>

            {userDetails ? (
              userDetails.usedLetters >= userDetails.letterLimit ? (
                <>
                  <Button variant="primary" type="submit" disabled>
                    {loading ? "Generating..." : "Submit"}
                  </Button>
                  <p className="text-danger d-inline ms-4">
                    You've used up your quota
                  </p>
                </>
              ) : (
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Generating..." : "Submit"}
                </Button>
              )
            ) : null}
          </Form>
          {response && (
            <div className="mt-4">
              <h4>Generated Cover Letter:</h4>
              <p style={{ whiteSpace: "pre-wrap" }}>{response}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
