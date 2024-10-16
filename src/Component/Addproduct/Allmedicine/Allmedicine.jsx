import axios from 'axios';
import './Allmedicine.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import base_url, { end_point } from '../../../Api/Api';
import { Container, Row, Col, Card, Button, Pagination, Form } from 'react-bootstrap';
import { useCallback } from 'react';

const Allmedicine = () => {
  const api = base_url + end_point.prod;
  const [state, setState] = useState([]);

  // Searching State
  const [search, setSearch] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;


  useEffect(() => {
    const getProduct = () => {
      axios.get(api)
        .then(result => {
          setState(result.data)
        })
        .catch(error => {
          console.log("Error", error);
        });
    };
    getProduct();
  }, [api]); // Add only 'api' as a dependency
  

  // Search and filter products
  const filteredItems = state.filter((item) => {
    if (search === "") {
      return item;
    } else if (item.Name.toLowerCase().includes(search.toLowerCase())) {
      return item;
    }
    return null;
  })
  // Calculate start and end indices for the current page
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const refresh = () => {
    window.location.reload();
  }

  return (
    <section className="py-5">
      <Container>
        <Form>
          <div className="search-button-container">
            <Form.Group controlId='basicSearch' className='mb-0'>
              <Form.Control type='text' placeholder='Search Product' onChange={(event) => { setSearch(event.target.value); setPage(0); }} className='search-input' />
            </Form.Group>

            <Button variant='success' onClick={refresh}>Refresh</Button>
          </div>
        </Form>
        <Row>
          {currentItems.map((ele) => (
            <Col sm={6} md={4} className="mb-4" key={ele.id}>
              <Card className="product-card shadow-sm">
                <div className="image-wrapper">
                  <Card.Img variant="top" src={ele.image} className="product-image" />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="product-title text-center">
                    <b>{ele.Name}</b>
                  </Card.Title>
                  <div className="d-flex justify-content-center mt-auto">
                    <Link to={`/Details/${ele.id}`}>
                      <Button variant="success" className="details-button">Details</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index}
                active={index === page}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1}
            />
          </Pagination>
        </div>
      </Container>
    </section>
  );
};

export default Allmedicine;
