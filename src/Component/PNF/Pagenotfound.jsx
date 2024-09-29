import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Pagenotfound.css'

const Pagenotfound = () => {
    return (
        <Container className="not-found-container text-center">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Oops! The page you're looking for can't be found.</p>
                <Button as={Link} to="/" variant="primary" className="back-home-btn">
                    Back to Home
                </Button>
            </div>
        </Container>
    );
}

export default Pagenotfound