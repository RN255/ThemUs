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
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="union flag"
              src={unionFlagPng}
              width="30"
              height="30"
              className="d-inline-block align-top me-3"
            />
            ThemUsNewsUK
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/info">Info</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
              {/* <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link> */}
              <Navbar.Text className="d-none d-lg-block"> {today} </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
