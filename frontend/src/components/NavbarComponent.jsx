import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavbarComponent = () => {
  const [expanded, setExpanded] = useState(false);

  const masterItems = [
    { path: "/action1", label: "Action" },
    { path: "/action2", label: "Another action" },
    { path: "/action3", label: "Something" },
    { path: "/action4", label: "Separated link", divider: true },
  ];

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm" expanded={expanded}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>Kasir</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <NavDropdown title="Master" id="basic-nav-dropdown">
              {masterItems.map((item, index) => (
                <div key={index}>
                  {item.divider && <NavDropdown.Divider />}
                  <NavDropdown.Item as={Link} to={item.path} onClick={() => setExpanded(false)}>
                    {item.label}
                  </NavDropdown.Item>
                </div>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
