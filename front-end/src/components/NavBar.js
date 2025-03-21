import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import unionFlagPng from "../assets/united-kingdom.png";
import { useEffect, useState } from "react";

function ColorSchemesExample() {
  const today = new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(
    new Date()
  );

  // get the user name
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/auth/user", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
        } else {
          setUser(null); // Ensures state is properly handled
        }
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  // Handle logout
  const handleLogout = () => {
    window.location.href = "http://localhost:5000/auth/logout";
  };

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
            THEM US <span className="fw-light">News UK</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto flex-grow-1 d-flex justify-content-start">
              {/* Left-aligned items */}
            </Nav>

            {/* <Nav className="flex-grow-1 d-flex justify-content-center ">
              <Nav.Link href="/info" className="d-inline">
                Info |
              </Nav.Link>
            </Nav> */}

            <Nav className="flex-grow-1 d-flex justify-content-end align-items-center">
              <Nav.Link href="/info" className="d-inline">
                Info <span className="d-none d-lg-inline">|</span>
              </Nav.Link>
              <Navbar.Text className="d-none d-lg-block">
                {today}
                <span className="d-none d-lg-inline mx-2">|</span>
                {/* <img
                  alt="union flag"
                  src={unionFlagPng}
                  width="30"
                  height="30"
                  className="d-inline-block align-top ms-3 border"
                />{" "} */}
              </Navbar.Text>
              {user ? (
                <Navbar.Text>
                  Signed in as: {user.displayName}
                  <button onClick={handleLogout}>Sign Out</button>
                </Navbar.Text>
              ) : (
                <Navbar.Text>
                  <Nav.Link href="/loginScreen">Log in</Nav.Link>{" "}
                </Navbar.Text>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
