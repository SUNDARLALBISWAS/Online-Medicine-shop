import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='full-page-background'>
      <Container className='py-5 custom-container'>

        <section className='mb-5 how-it-works-section' style={{ minHeight: '600px' }}>
          <h2 className='text-center mb-4'>How It Works</h2>
          <Row className='align-items-center'>
            <Col md={6} className='text-center'>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src='https://tse2.mm.bing.net/th?id=OIP.gk7bBcHNc93c0Ku_W0u-8QHaD5&pid=Api&P=0&h=180'
                  alt='Browse Medicines'
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto',
                  }}
                />
                <Card.Body>
                  <Card.Title>Browse Medicines</Card.Title>
                  <Card.Text>Find the medicines you need quickly and easily.</Card.Text>
                  <Button as={Link} to='/Allmedicine' variant="success">Medicine</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <div className='pharmacy-info'>
                <h3 className='mb-3'>Your Trusted Online Pharmacy</h3>
                <p>
                  At our online pharmacy, we provide a wide range of medicines at your
                  fingertips. Whether you need over-the-counter products or
                  prescription medications, we make the process convenient and
                  straightforward. Simply browse, upload your prescription, and have
                  your order delivered to your doorstep.
                </p>
                <p>
                  Enjoy a seamless and safe way to get your medicines, with options
                  for fast delivery and order tracking. Your health and convenience
                  are our top priorities.
                </p>
              </div>
            </Col>
          </Row>
        </section>


        {/* Why Choose Us Section */}
        <section className='mb-5 why-choose-us-section'>
          <h2 className='text-center mb-4'>Why Choose Us</h2>
          <Row className='text-center'>
            <Col md={3}>
              <Card className='h-100'>
                <Card.Img variant='top' src='https://tse1.mm.bing.net/th?id=OIP.71tpaaFbk8UJyZ-O9knw1QHaD5&pid=Api&P=0&h=180' alt='Wide Selection' className='custom-image' />
                <Card.Body>
                  <Card.Title>Wide Selection</Card.Title>
                  <Card.Text>
                    Thousands of medicines and healthcare products to choose from.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className='h-100'>
                <Card.Img variant='top' src='https://tse3.mm.bing.net/th?id=OIP.RI5M5483tNV2v8Z2aIoykAHaEk&pid=Api&P=0&h=180' alt='Fast Delivery' className='custom-image' />
                <Card.Body>
                  <Card.Title>Fast Delivery</Card.Title>
                  <Card.Text>
                    Same-day or next-day delivery available.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className='h-100'>
                <Card.Img variant='top' src='https://www.composite-material.it/wp-content/uploads/2022/09/VEDCompany-Certified-trusted-partner_-1-1200x600.jpg' alt='Certified & Trusted' className='custom-image' />
                <Card.Body>
                  <Card.Title>Certified & Trusted</Card.Title>
                  <Card.Text>
                    All medicines are verified by licensed pharmacists.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className='h-100'>
                <Card.Img variant='top' src='https://tse1.mm.bing.net/th?id=OIP.yBEJJ6IJZeAB1VygO4Aj3QHaE8&pid=Api&P=0&h=180' alt='Customer Support' className='custom-image' />
                <Card.Body>
                  <Card.Title>Customer Support</Card.Title>
                  <Card.Text>
                    24/7 support for queries and consultations.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>


        {/* Mission Section */}
        <section className='text-center mb-5'>
          <h2>Our Mission</h2>
          <p>
            At <strong>Your Shop Name</strong>, we are committed to providing
            high-quality medicines and healthcare solutions at your doorstep. Our
            mission is to make healthcare accessible, affordable, and available
            to everyone.
          </p>
        </section>

        {/* Who We Are Section */}
        <section className='mb-5'>
          <h2 className='text-center'>Who We Are</h2>
          <Row className='justify-content-center'>
            <Col md={8}>
              <p>
                Founded in 2020, <strong>Your Shop Name</strong> has been
                revolutionizing the way people buy medicines online. With a team
                of certified pharmacists, healthcare professionals, and a strong
                logistics network, we ensure timely and secure delivery of
                medicines across the country.
              </p>
            </Col>
          </Row>
        </section>

        {/* Testimonials Section */}
        <section className='mb-5'>
          <h2 className='text-center'>What Our Customers Say</h2>
          <Row className='text-center'>
            <Col md={4}>
              <Card>
                <div className="image-wrapper">
                  <img
                    src="Reviewimage/review2.jpg"
                    alt="John D."
                    className="testimonial-img"
                  />
                </div>
                <Card.Body>
                  <Card.Text>
                    "I was able to get my prescription medicines delivered within 24 hours! Great service and very reliable." - John D.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <div className="image-wrapper">
                  <img
                    src="Reviewimage/review1.jpg"
                    alt="Sarah M."
                    className="testimonial-img"
                  />
                </div>
                <Card.Body>
                  <Card.Text>
                    "Easy to navigate, great prices, and fast delivery. I will definitely use this service again!" - Sarah M.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <div className="image-wrapper">
                  <img
                    src="Reviewimage/review3.jpg"
                    alt="Mark T."
                    className="testimonial-img"
                  />
                </div>
                <Card.Body>
                  <Card.Text>
                    "Excellent customer support, they helped me through the entire process smoothly and efficiently!" - Mark T.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

      </Container>
    </div>
  );
};

export default About;
