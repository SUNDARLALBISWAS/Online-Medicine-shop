import React, { useState, useEffect } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

const Editpage = () => {
    const Navigate = useNavigate();
    const { id } = useParams();
    const api = `http://localhost:1000/product/${id}`;
    console.log("api", api);

    const [state, setState] = useState({
        Name: "",
        Composition: "",
        Manufacturer: "",
        Originofmedicine: "",
        price: "",
        errors: {
            Name: "",
            Composition: "",
            Manufacturer: "",
            Originofmedicine: "",
            price: "",
        }
    });

    const getDetails = () => {
        axios.get(api)
            .then(result => {
                console.log("Product Details", result.data);
                setState(prevState => ({
                    ...prevState,
                    Name: result.data.Name,
                    Composition: result.data.Composition,
                    Manufacturer: result.data.Manufacturer,
                    Originofmedicine: result.data.Originofmedicine,
                    price: result.data.price,
                    image: result.data.image
                }));
            })
            .catch(error => {
                console.log("Axios Error", error);
            });
    };
    useEffect(() => {
        getDetails();
    }, [getDetails, api]);

    const changeHandler = (event) => {
        const { name, value } = event.target;
        const errors = { ...state.errors };

        switch (name) {
            case 'Name':
                errors.Name = value.length < 1 ? "Required Field" : "";
                break;
            case 'Composition':
                errors.Composition = value.length < 1 ? "Required Field" : "";
                break;
            case 'Manufacturer':
                errors.Manufacturer = value.length < 1 ? "Required Field" : "";
                break;
            case 'Originofmedicine':
                errors.Originofmedicine = value.length < 1 ? "Required Field" : "";
                break;
            case 'price':
                errors.price = value.length < 1 ? "Required Field" : "";
                break;
            default:
                break;
        }
        setState({ ...state, [name]: value, errors });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const base64 = await getBase64(file);
        setState({ ...state, image: base64 });
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const formData = {
            Name: state.Name,
            Composition: state.Composition,
            Manufacturer: state.Manufacturer,
            Originofmedicine: state.Originofmedicine,
            price: state.price,
            image: state.image
        };

        axios.put(api, formData)
            .then(result => {
                if (result.status === 200 || result.status === 201) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product Updated Successfully!',
                        icon: 'Success',
                        confirmButtonText: 'OK'
                    });
                    Navigate("/Deshboard");
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something Went Wrong!',
                        icon: 'Error',
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to Update Product!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                console.log("Error", error);
            });
    };

    return (
        <section className='py-5'>
            <Container className='form-container'>
                <h2 className='text-center mb-4'>Add Product</h2>
                <Form onSubmit={submitHandler}>

                    <Form.Group className='mb-3' controlId='medName'>
                        <Form.Label>Medicine Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter Name' name='Name' value={state.Name} onChange={changeHandler} />
                    </Form.Group>
                    {state.errors.Name && <p>{state.errors.Name}</p>}

                    <Form.Group className='mb-3' controlId='medComposition'>
                        <Form.Label>Composition</Form.Label>
                        <Form.Control type='text' placeholder='Enter Composition' name='Composition' value={state.Composition} onChange={changeHandler} />
                    </Form.Group>
                    {state.errors.Composition && <p>{state.errors.Composition}</p>}

                    <Form.Group className='mb-3' controlId='medManufacturer'>
                        <Form.Label>Manufacturer</Form.Label>
                        <Form.Control type='text' placeholder='Enter Manufacturer' name='Manufacturer' value={state.Manufacturer} onChange={changeHandler} />
                    </Form.Group>
                    {state.errors.Manufacturer && <p>{state.errors.Manufacturer}</p>}

                    <Form.Group className='mb-3' controlId='medOriginofmedicine'>
                        <Form.Label>Origin of Medicine</Form.Label>
                        <Form.Control type='text' placeholder='Enter Origin of Medicine' name='Originofmedicine' value={state.Originofmedicine} onChange={changeHandler} />
                    </Form.Group>
                    {state.errors.Originofmedicine && <p>{state.errors.Originofmedicine}</p>}

                    <Form.Group className='mb-3' controlId='medPrice'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' placeholder='Enter Price' name='price' value={state.price} onChange={changeHandler} />
                    </Form.Group>
                    {state.errors.price && <p>{state.errors.price}</p>}

                    <Form.Group className='mb-3' controlId='basicUpload'>
                        <Form.Label>Upload Medicine Image</Form.Label>
                        <Form.Control type='file' placeholder='Medicine Image' name='pic' onChange={handleFileChange} />
                    </Form.Group>


                    <Button variant='success' type='submit' className='d-block mx-auto'>
                        Update
                    </Button>
                </Form>
            </Container>
        </section>
    )
}

export default Editpage;

