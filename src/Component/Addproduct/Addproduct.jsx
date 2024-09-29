import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import base_url, { end_point } from '../../Api/Api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {

  const Navigate=useNavigate();
  const api = base_url + end_point.prod;

  const [inputState, setInput] = useState({
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

  const [image,setImage]=useState("");

const changeHandler = (event) => {
  const { name, value } = event.target;
  let errors = { ...inputState.errors };

  switch(name){
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
      console.log("Not Applicable");
  }
  setInput({ ...inputState,[name]: value, errors });
};

// Handle image upload
const handleImage = (file) => {
  const fileReader = new FileReader();
  fileReader.addEventListener('load', () => {
    setImage(fileReader.result)
  })
  fileReader.readAsDataURL(file);
};

const submitHandler = (event) => {
  event.preventDefault();
  const formData = {
    Name: inputState.Name,
    Composition: inputState.Composition,
    Manufacturer: inputState.Manufacturer,
    Originofmedicine: inputState.Originofmedicine,
    price: inputState.price,
    image: image    
  };

  axios.post(api, formData)
    .then(result => {
      if (result.status === 200 || result.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: result.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        Navigate('/Deshboard')
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
    .catch(error => {
      console.log("Error", error);
    });
};

const isFormValid = () => {
  return (
    inputState.Name !== "" &&
    inputState.Composition !== "" &&
    inputState.Manufacturer !== "" &&
    inputState.Originofmedicine !== "" &&
    inputState.price !== "" &&
    image !== "" 
  );
};

return (
  <section className='py-5'>
    <Container className='form-container'>
      <h2 className='text-center mb-4'>Add Product</h2>
      <Form onSubmit={submitHandler}>

        <Form.Group className='mb-3' controlId='medName'>
          <Form.Label>Medicine Name</Form.Label>
          <Form.Control type='text' placeholder='Enter Name' name='Name' onChange={changeHandler} />
        </Form.Group>
        {inputState.errors.Name && <p>{inputState.errors.Name}</p>}

        <Form.Group className='mb-3' controlId='medComposition'>
          <Form.Label>Composition</Form.Label>
          <Form.Control type='text' placeholder='Enter Composition' name='Composition' onChange={changeHandler} />
        </Form.Group>
        {inputState.errors.Composition && <p>{inputState.errors.Composition}</p>}

        <Form.Group className='mb-3' controlId='medManufacturer'>
          <Form.Label>Manufacturer</Form.Label>
          <Form.Control type='text' placeholder='Enter Manufacturer' name='Manufacturer' onChange={changeHandler} />
        </Form.Group>
        {inputState.errors.Manufacturer && <p>{inputState.errors.Manufacturer}</p>}

        <Form.Group className='mb-3' controlId='medOriginofmedicine'>
          <Form.Label>Origin of Medicine</Form.Label>
          <Form.Control type='text' placeholder='Enter Origin of Medicine' name='Originofmedicine' onChange={changeHandler} />
        </Form.Group>
        {inputState.errors.Originofmedicine && <p>{inputState.errors.Originofmedicine}</p>}

        <Form.Group className='mb-3' controlId='medPrice'>
          <Form.Label>Price</Form.Label>
          <Form.Control type='number' placeholder='Enter Price' name='price' onChange={changeHandler} />
        </Form.Group>
        {inputState.errors.price && <p>{inputState.errors.price}</p>}

        <Form.Group className='mb-3' controlId='basicUpload'>
          <Form.Label>Upload Medicine Image</Form.Label>
          <Form.Control type='file' placeholder='Medicine Image' name='pic' onChange={(event) => handleImage(event.target.files[0])} accept='image/*' />
        </Form.Group>
        {inputState.errors.image && <p>{inputState.errors.image}</p>}

        <Button variant='success' type='submit' className='d-block mx-auto' disabled={!isFormValid()}>
          Submit
        </Button>
      </Form>
    </Container>
  </section>
)
};

export default Addproduct;

