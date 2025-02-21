import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import unionFlagPng from "../assets/united-kingdom.png";

function ColorSchemesExample() {
  const today = new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(
    new Date()
  );

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
                Info |
              </Nav.Link>
              <Navbar.Text className="d-none d-lg-block">
                {today}
                {/* <img
                  alt="union flag"
                  src={unionFlagPng}
                  width="30"
                  height="30"
                  className="d-inline-block align-top ms-3 border"
                />{" "} */}
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
