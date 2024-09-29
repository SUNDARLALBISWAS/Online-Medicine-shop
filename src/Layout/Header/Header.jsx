import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  let id = window.sessionStorage.getItem("id");
  let isUserLogged = window.sessionStorage.getItem("isUserLogged");
  let profileImage = window.sessionStorage.getItem("profileImage"); // Get profile image from sessionStorage

  return (
    <Navbar expand="lg" bg="white" variant="light" className="sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="BannerImages/logo.png" alt="Logo" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/Allmedicine">All Categories</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown
              title={
                <>
                  {isUserLogged && profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} /> // Default user icon
                  )}
                  <span className="ms-2">User</span>
                </>
              }
              id="basic-nav-dropdown"
              align="end" // Align dropdown to the right
            >
              <NavDropdown.Item as={Link} to="/Sign-Up">
                <FontAwesomeIcon icon={faUserPlus} className="me-2" /> {/* Register icon */}
                Register
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={isUserLogged ? `/Profileuser/${id}` : "/sign-in"}>
                <FontAwesomeIcon icon={isUserLogged ? faUser : faSignInAlt} className="me-2" /> {/* Login icon */}
                {isUserLogged ? "Profile" : "Login"}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

