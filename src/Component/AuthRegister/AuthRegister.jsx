import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import base_url, { end_point } from '../../Api/Api';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import './AuthRegister.css';
import { Link } from 'react-router-dom';

const AuthRegister = () => {
  const Navigate = useNavigate();
  const api = base_url + end_point.register;
  // console.log("Api",api);
  let [showpwd, setShowpwd] = useState(false);
  let [showconpwd, setShowconpwd] = useState(false);
  const togglePss = () => {
    setShowpwd(!showpwd)
  }
  const toggleconPss = () => {
    setShowconpwd(!showconpwd)
  }
  const [inputState, setInput] = useState({
    first_name: "",
    last_name: "",
    usrn: "",
    mail: "",
    pwd: "",
    pwd1: "",
    errors: {
      first_name: "",
      last_name: "",
      usrn: "",
      mail: "",
      pwd: "",
      pwd1: ""
    }
  });

  const [image, setImage] = useState("");
  const [oldData, setOlddata] = useState([]);

  useEffect(() => {
    axios
      .get(api)
      .then((result) => {
        setOlddata(result.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    let err = { ...inputState.errors };
    switch (name) {
      case 'first_name':
        err.first_name = value.length < 1 ? "Required Field" :
          (value.length < 3 ? "Minimum 3 Character Required" : "");
        break;
      case 'last_name':
        err.last_name = value.length < 1 ? "Required Field" :
          (value.length < 3 ? "Minimum 3 Character Required" : "");
        break;
      case 'usrn':
        err.usrn = value.length < 1 ? "Required Field" :
          (value.length < 5 ? "Minimum 5 Character Required" : "");
        break;
      case 'mail':
        err.mail = value.length < 1 ? "Required Field" :
          (value.length < 10 ? "Minimum 10 Character Required" : "");
        break;
      case 'pwd':
        err.pwd = value.length < 1 ? "Required Field" :
          (value.length < 4 ? "Minimum 4 Character Required" : "");
        break;
      case 'pwd1':
        err.pwd1 = inputState.pwd === value ? "Password Match" : "Password Not Match";
        break;
      default:
        console.log("Not Applicable");
    }
    setInput({ ...inputState, [name]: value, errors: err });
  };

  const handleImage = (file) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      setImage(fileReader.result);
    });
    fileReader.readAsDataURL(file);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log("Submit Value", inputState, image);

    let registerEmail = oldData.find((user) => user.email === inputState.mail);
    let registerUsername = oldData.find((user) => user.username === inputState.usrn);

    if (registerEmail) {
      Swal.fire({
        title: 'Email Exists',
        text: 'This email is already registered. Please use a different email.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else if (registerUsername) {
      Swal.fire({
        title: 'Username Exists',
        text: 'This username is already taken. Please choose a different username.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      const formData = {
        fname: inputState.first_name,
        lname: inputState.last_name,
        username: inputState.usrn,
        email: inputState.mail,
        password: inputState.pwd,
        Confirmpassword: inputState.pwd1,
        image: image
      };

      axios.post(api, formData)
        .then(result => {
          // console.log("Result", result);
          if (result.status === 200 || result.status === 201) {

            Swal.fire({
              title: 'Success!',
              text: result.data.message,
              icon: 'success',
              confirmButtonText: 'OK'
            });
            Navigate("/Sign-In");
          }
        })
        .catch(error => {
          console.error("Error", error);
        });
    }
  };

  const myFunction = () => {
    return (
      inputState.first_name === "" || inputState.last_name === "" || inputState.usrn === "" || inputState.mail === "" ||
      inputState.pwd === "" || inputState.pwd1 === "" || inputState.errors.first_name !== "" ||
      inputState.errors.last_name !== "" || inputState.errors.usrn !== "" || inputState.errors.mail !== "" || inputState.errors.pwd !== "" ||
      inputState.errors.pwd1 === "Password Not Match"
    );
  };

  return (
    <section className='auth-register py-5'>
      <Container className='form-container'>
        <h2 className='text-center mb-4'>Register Author</h2>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={6}>
              <Form.Group className='mb-3' controlId='basicFirstname'>
                <Form.Label>First Name</Form.Label>
                <Form.Control type='text' placeholder='Enter Firstname' name='first_name' onChange={changeHandler} />
              </Form.Group>
              {inputState.errors.first_name && <p className='text-danger text-end'>{inputState.errors.first_name}</p>}

            </Col>

            <Col md={6}>
              <Form.Group className='mb-3' controlId='basicLastname'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type='text' placeholder='Enter Lastname' name='last_name' onChange={changeHandler} />
              </Form.Group>
              {inputState.errors.last_name && <p className='text-danger text-end'>{inputState.errors.last_name}</p>}
            </Col>
          </Row>

          <Form.Group className='mb-3' controlId='basicUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' placeholder='Enter Username' name='usrn' onChange={changeHandler} />
          </Form.Group>
          {inputState.errors.usrn && <p className='text-danger text-end'>{inputState.errors.usrn}</p>}

          <Form.Group className='mb-3' controlId='basicMail'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' name='mail' onChange={changeHandler} />
          </Form.Group>
          {inputState.errors.mail && <p className='text-danger text-end'>{inputState.errors.mail}</p>}

          <Row>
            <Col md={6}>
              <Form.Group className='mb-3' controlId='basicPassword'>
                <Form.Label>Password</Form.Label>
                <div className='input-group'>
                  <Form.Control type={showpwd ? "text" : "password"} placeholder='Enter Password' name='pwd' onChange={changeHandler} />
                  <span className='input-group-text' onClick={togglePss} style={{ cursor: "pointer" }}>
                    {showpwd ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

              </Form.Group>
              {inputState.errors.pwd && <p className='text-danger text-end'>{inputState.errors.pwd}</p>}
            </Col>

            <Col md={6}>
              <Form.Group className='mb-3' controlId='ConfirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <div className='input-group'>
                  <Form.Control type={showconpwd ? "text" : "password"} placeholder='Confirm Password' name='pwd1' onChange={changeHandler} />
                  <span className='input-group-text' onClick={toggleconPss} style={{ cursor: "pointer" }}>
                    {showpwd ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </Form.Group>
              {inputState.errors.pwd1 && <p className='text-danger text-end'>{inputState.errors.pwd1}</p>}
            </Col>
          </Row>

          <Form.Group className='mb-4' controlId='basicFile'>
            <Form.Label>Upload Profile Picture</Form.Label>
            <Form.Control type='file' onChange={(event) => handleImage(event.target.files[0])} accept='image/*' />
          </Form.Group>

          <div className='text-center'>
            <Button variant='success' type='submit' disabled={myFunction()}>
              Register
            </Button>
          </div>

          <div className='text-center mt-3'>
            <p>If You Already Create an Account? <Link to="/Sign-In">Log In</Link></p>
          </div>
        </Form>
      </Container>
    </section>
  );
};

export default AuthRegister;
