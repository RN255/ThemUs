import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function ColorSchemesExample() {
  // const today = new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(
  //   new Date()
  // );

  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // or wherever you want
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
          <Navbar.Brand
            as={Link}
            to="/"
            className="twoPointFiveRem fw-bold pt-0"
          >
            THEM US
            <span className="fw-light"> Nexus</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto flex-grow-1 d-flex justify-content-start">
              {/* <Nav.Link
                as={Link}
                to="/coverLetterCreator"
                className="d-inline text-center"
              >
                Cover Letter Creator
              </Nav.Link> */}
              <Nav.Link
                as={Link}
                to="/SceneDora"
                className="d-inline text-center"
              >
                SceneDora
              </Nav.Link>
            </Nav>

            {/* <Nav className="flex-grow-1 d-flex justify-content-center navbar-fade-in">
              <Nav.Link
                href="/coverLetterCreator"
                className="d-inline text-center"
              >
                Cover Letter Creator
              </Nav.Link>
            </Nav> */}

            <Nav className="flex-grow-1 d-flex justify-content-end align-items-center">
              <Nav.Link as={Link} to="/info" className="d-inline">
                Info
              </Nav.Link>
              {/* <Navbar.Text>|</Navbar.Text> */}

              {/* <Navbar.Text className="d-none d-lg-block">
                {today}
                <span className="d-none d-lg-inline mx-2">|</span>
              </Navbar.Text> */}
              {/* <Nav className="minWidth100px text-center"> */}
              {/* {loading ? (
                <Nav.Link>Log in</Nav.Link>
              ) : user ? (
                <>
                  <Nav.Link className="d-inline" as={Link} to="/userProfile">
                    Hello, {user.displayName}
                  </Nav.Link>
                  <Navbar.Text>|</Navbar.Text>
                  <Nav.Link className="d-inline-block" onClick={handleLogout}>
                    Sign Out
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/loginScreen">
                  Log in
                </Nav.Link>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
