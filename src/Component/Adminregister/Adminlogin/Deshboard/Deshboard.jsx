import React, { useState, useEffect } from 'react';
import base_url, { end_point } from '../../../../Api/Api';
import axios from 'axios';
import { Container, Table, Button, Form, Modal, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Deshboard.css';

const Deshboard = () => {
    const api = base_url + end_point.prod;
    const [state, setState] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);
    const [selectedMedicine, setselectedMedicine] = useState(null);

    const [page, setPage] = useState(0);
    const itemsPerPage = 6;

    // Fetch products from API
    const getProduct = () => {
        axios.get(api)
            .then(result => {
                setState(result.data);
            })
            .catch(error => {
                console.log("Error fetching data", error);
            });
    };

    useEffect(() => {
        getProduct();
    }, [getProduct, api]);

    // Delete product
    const deleteItem = (ele_id) => {
        axios.delete(`http://localhost:1000/product/${ele_id}`)
            .then(() => {
                getProduct();
            })
            .catch(error => {
                console.log("Axios Error to delete item", error);
            });
    };

    const Refresh = () => {
        window.location.reload();
    };

    const handleShow = (id) => {
        axios.get(`http://localhost:1000/product/${id}`)
            .then(result => {
                setselectedMedicine(result.data);
                setShow(true);
            })
            .catch(error => {
                console.log("Axios Error", error);
            });
    };

    const handleClose = () => {
        setShow(false);
    };

    // Search and filter products
    const filteredItems = state.filter((item) => {
        if (search === "") {
            return item;
        } else if (item.Name.toLowerCase().includes(search.toLowerCase())) {
            return item;
        }
        return null;
    });

    // Pagination logic applied after filtering
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <section className='py-5'>
            <Container>
                <h4 className='text-center'>Admin Dashboard</h4>
                <Form>
                    <div className="search-button-container">
                        <Form.Group controlId="basicsearch" className='mb-0'>
                            <Form.Control type="text" placeholder="Search Product" onChange={(event) => { setSearch(event.target.value); setPage(0); }} className="search-input" />
                        </Form.Group>
                        <Link to={`/Addproduct`}>
                            <Button variant="success" className="add-product-btn">Add Product</Button>
                        </Link>
                        <Button variant='success' onClick={Refresh} className='refresh-btn'>Refresh</Button>
                    </div>
                </Form>

                <Table striped bordered hover responsive="sm" className="mt-4">
                    <thead className='bg-primary text-white'>
                        <tr>
                            <th>Image</th>
                            <th>Medicine Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((ele, index) => (
                            <tr key={index}>
                                <td><img src={ele.image} alt="medicine" className='product-img' /></td>
                                <td>{ele.Name}</td>
                                <td>
                                    <Button variant="info" className='me-2' onClick={() => handleShow(ele.id)}>View</Button>
                                    <Link to={`/Editpage/${ele.id}`}>
                                        <Button variant="warning" className='me-2'>Edit</Button>
                                    </Link>
                                    <Button variant="danger" onClick={() => { deleteItem(ele.id) }}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Medicine Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedMedicine ? (
                            <>
                                <img src={selectedMedicine.image} alt="medicine" />
                                <h4>Medicine Name: <span>{selectedMedicine.Name}</span></h4>
                                <p><span>Composition:</span> {selectedMedicine.Composition}</p>
                                <p><span>Manufacturer:</span> {selectedMedicine.Manufacturer}</p>
                                <p><span>Origin of Medicine:</span> {selectedMedicine.Originofmedicine}</p>
                                <p><span>Price:</span> ₹{selectedMedicine.price}</p>
                            </>
                        ) : (
                            <p>Loading Details...</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item key={index} active={index === page} onClick={() => handlePageChange(index)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1} />
                    </Pagination>
                </div>
            </Container>
        </section>
    );
}

export default Deshboard;
