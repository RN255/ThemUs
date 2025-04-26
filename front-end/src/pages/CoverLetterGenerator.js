import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Nav, Alert } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import LetterGeneratorFeatures from "../components/LetterGeneratorFeatures";

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
        const res = await axios.get(
          `https://themus.onrender.com/users/${user._id}`,
          {
            withCredentials: true,
          }
        );
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

    try {
      const res = await axios.post(
        // "https://themus.onrender.com/api/gpt/generate",
        "https://themus.onrender.com/api/gpt/generate",
        { cvText, jobDesc },
        {
          withCredentials: true, // ✅ Crucial
          headers: { "Content-Type": "application/json" },
        }
      );

      const generatedLetter = res.data.response;
      setResponse(generatedLetter);

      // ✅ NOW: Save the GPT-generated cover letter to MongoDB
      await axios.post(
        "https://themus.onrender.com/coverLetters",
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

  // word limit counter
  const maxChars = 6000; // or whatever limit you want

  const cvChars = cvText.length;
  const jobChars = jobDesc.length;

  const isValid = cvChars <= maxChars && jobChars <= maxChars;

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
      <div className="page-fade-in">
        <Row className="my-5 mb-3">
          <Col>
            <h2 className="text-center display-5 mb-4">
              AI Cover Letter Creator
            </h2>
            <p className="text-center fst-italic">
              Sometimes it's hard to know what to say.
            </p>
            {user ? null : (
              <p className="text-center fst-italic text-danger mb-1">
                Please{" "}
                <Link to="/loginScreen" className="text-danger">
                  register
                </Link>{" "}
                to use this Creator
              </p>
            )}
            {userDetails?.plan === "free" && (
              <p className="text-center fst-italic text-danger mb-1">
                Please{" "}
                <Link to="/pricingCoverLetter" className="text-danger">
                  pay
                </Link>{" "}
                to use more letters
              </p>
            )}
          </Col>
        </Row>
        <LetterGeneratorFeatures></LetterGeneratorFeatures>
        {userDetails && (
          <Row className="mb-4">
            <Col className="fst-italic">
              Number of letters used:{" "}
              {user ? (
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
        )}
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-5" controlId="cvInput">
                <Form.Label className="lead">Enter your CV in here:</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={10}
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                />
                <div className={cvChars > maxChars ? "text-danger" : ""}>
                  {cvChars} / {maxChars} characters
                </div>
              </Form.Group>

              <Form.Group className="mb-4" controlId="jobDescInput">
                <Form.Label className="lead">
                  Enter the job description in here:
                </Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={10}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                />
                <div className={jobChars > maxChars ? "text-danger" : ""}>
                  {jobChars} / {maxChars} characters
                </div>
                {!isValid && (
                  <p className="text-danger">
                    CV or job description is too long.
                  </p>
                )}
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
                  <>
                    {response && (
                      <div>
                        <Alert variant="light">
                          <Alert.Heading>
                            Scroll down to see cover letter
                          </Alert.Heading>
                          <p>
                            All cover letters are stored in{" "}
                            <Alert.Link href="/previousLetters">
                              Letter History
                            </Alert.Link>
                          </p>
                        </Alert>
                      </div>
                    )}
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!isValid || loading}
                      className="mt-2"
                    >
                      {loading ? "Generating..." : "Submit"}
                    </Button>
                  </>
                )
              ) : (
                <Button variant="primary" type="submit" disabled>
                  {loading ? "Generating..." : "Submit"}
                </Button>
              )}
            </Form>
            {response && (
              <div className="mt-4">
                <h4>Cover Letter:</h4>
                <p style={{ whiteSpace: "pre-wrap" }}>{response}</p>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
}
