import React, { useContext } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../../context/userContext";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({});
    history.push("/login");
  };
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container fluid>
        <LinkContainer to="/dashboard">
          <Navbar.Brand href="#home"><i class="fas fa-chart-line text-warning"></i> Dashboard</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {user.token && (
              <>
                <OverlayTrigger
                  placement="left"
                  overlay={<Tooltip>Create new Problem!</Tooltip>}
                >
                  <LinkContainer to="/create">
                    <Nav.Link>New</Nav.Link>
                  </LinkContainer>
                </OverlayTrigger>
                <NavDropdown title={user.username} id="dropdownMenu">
                  {user.isAdmin ? (
                    <LinkContainer to="/problems">
                      <NavDropdown.Item>problems</NavDropdown.Item>
                    </LinkContainer>
                  ) : (
                    <LinkContainer to={`/profile/${user._id}`}>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
