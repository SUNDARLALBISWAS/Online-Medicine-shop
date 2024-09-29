import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Details.css';

const Details = () => {
    let { id } = useParams();
    let api = `http://localhost:1000/product/${id}`;
    let [state, setState] = useState([]);

    const getProduct = () => {
        axios.get(api)
            .then(result => {
                console.log("Result", result.data);
                setState([result.data]);
            })
            .catch(error => {
                console.log("Axios Error", error);
            });
    };

    useEffect(() => {
        getProduct();
    }, [api]);

    return (
        <section className='py-5'>
            <Container>
                <Row className="justify-content-center">
                    {state.map((ele, index) => (
                        <Col md={8} key={index}>
                            <Card className="details-card shadow-sm">
                                <div className="image-container">
                                    <Card.Img
                                        variant="top"
                                        src={ele.image}
                                        alt={ele.Name}
                                        className="details-image"
                                    />
                                </div>
                                <Card.Body className="details-body">
                                    <Card.Title className="text-center details-card-title">
                                        {ele.Name}
                                    </Card.Title>
                                    <Card.Text className="details-text">
                                        <b>Composition:</b> {ele.Composition}
                                    </Card.Text>
                                    <Card.Text className="details-text">
                                        <b>Manufacturer:</b> {ele.Manufacturer}
                                    </Card.Text>
                                    <Card.Text className="details-text">
                                        <b>Origin of Medicine:</b> {ele.Originofmedicine}
                                    </Card.Text>
                                    <Card.Text className="details-text price-tag">
                                        Price: ₹{ele.price}
                                    </Card.Text>
                                    <div className="text-center buy-button">
                                        <Button variant="success" size="lg">Buy Now</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Details;
