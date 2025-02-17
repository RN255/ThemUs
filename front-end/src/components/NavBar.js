import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function ColorSchemesExample() {
  return (
    <>
      <Navbar className="standardColorBackground" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ThemUsNews</Navbar.Brand>
          <Nav>
            <Nav.Link href="/info">Info</Nav.Link>
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
