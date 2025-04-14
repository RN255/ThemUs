import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import unionFlagPng from "../assets/united-kingdom.png";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function ColorSchemesExample() {
  const today = new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(
    new Date()
  );

  const { user, loading, logout } = useAuth();

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="standardColorBackground"
        data-bs-theme="dark"
      >
        <Container className="p-sm-0 p-2">
          <Navbar.Brand href="/" className="twoPointFiveRem fw-bold pt-0">
            THEM US <span className="fw-light">AI</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto flex-grow-1 d-flex justify-content-start">
              {/* Left-aligned items */}
            </Nav>

            <Nav className="flex-grow-1 d-flex justify-content-center navbar-fade-in">
              <Nav.Link href="/coverLetterGenerator" className="d-inline">
                Cover Letter Creator
              </Nav.Link>
            </Nav>

            <Nav className="flex-grow-1 d-flex justify-content-end align-items-center">
              <Nav.Link href="/info" className="d-inline">
                Info <span className="d-none d-lg-inline">|</span>
              </Nav.Link>
              <Navbar.Text className="d-none d-lg-block">
                {today}
                <span className="d-none d-lg-inline mx-2">|</span>
              </Navbar.Text>
              <Navbar.Text className="minWidth100px">
                {loading ? (
                  <Nav.Link>Log in</Nav.Link>
                ) : user ? (
                  <>
                    Hello, {user.displayName}
                    <Nav.Link className="d-inline-block" onClick={logout}>
                      Sign Out
                    </Nav.Link>
                  </>
                ) : (
                  <Nav.Link href="/loginScreen">Log in</Nav.Link>
                )}
              </Navbar.Text>
              {/* {user ? (
                <>
                  <Navbar.Text> */}
              {/* Signed in as: {user.displayName} */}
              {/* <button onClick={handleLogout}>Sign Out</button> */}
              {/* <Nav.Link
                      className="d-inline-block item-fade-in"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Nav.Link>{" "}
                  </Navbar.Text>
                </>
              ) : (
                <>
                  <Navbar.Text>
                    <Nav.Link href="/loginScreen">Log in</Nav.Link>{" "}
                  </Navbar.Text>
                </>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
