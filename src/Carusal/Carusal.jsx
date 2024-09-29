import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button'; // Import Button component
import { Link } from 'react-router-dom';
import './Carusal.css'; // Import your CSS file

const Carusal = () => {
  return (
    <Carousel controls={false} indicators={false} data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="BannerImages/slider1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
        <Button as={Link} to='/Allmedicine' variant="primary">Shop Now</Button>
          <h2>Your Health, Our Priority</h2>
          <p>Reliable medicines delivered to your door, ensuring your well-being every step of the way.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="BannerImages/slider2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
        <Button as={Link} to='/Allmedicine' variant="primary">Shop Now</Button>
          <h2>Affordable, Trusted, and Convenient</h2>
          <p>Order essential medicines online and save time with our fast delivery service.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="BannerImages/slider3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
        <Button as={Link} to='/Allmedicine' variant="primary">Shop Now</Button>
          <h2>24/7 Access to Care</h2>
          <p>From over-the-counter solutions to prescription refills, we've got you covered anytime, anywhere.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carusal;
