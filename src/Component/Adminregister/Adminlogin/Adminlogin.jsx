import React, { useState, useEffect } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import base_url, { end_point } from '../../../Api/Api';

const Adminlogin = () => {
  const api = base_url + end_point.admin;
  const navigate = useNavigate();

  const [state, setState] = useState({
    loginField: '',
    pwd: '',
  });

  const [olddata, setOlddata] = useState([]);
  useEffect(() => {
    const getLogin = () => {
      axios.get(api)
        .then((result) => {
          setOlddata(result.data);
        })
        .catch((error) => {
          console.log("Axios Error", error);
        });
    };
  
    getLogin();
  }, [api]);  // Only depend on 'api'
  

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { loginField, pwd } = state;
    const user = olddata.find(({ email, username, password }) => {
      const isLoginFieldMatch = email === loginField || username === loginField;
      const isPasswordMatch = password === pwd;
      return isLoginFieldMatch && isPasswordMatch;
    });
    if (user) {
      Swal.fire({
        title: 'Login Successful',
        text: 'You have successfully logged in',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      window.sessionStorage.setItem("isAdminLogged", "true");
      navigate('/Deshboard');
    } else {
      Swal.fire({
        title: 'Login Failed',
        text: 'Invalid Username/Email or Password.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  const isFormValid = () => {
    return (state.loginField === "" || state.pwd === "")
  };
  return (
    <section className="py-3">
      <Container>
        <h2>Login</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="loginField">
            <Form.Label>Enter Username or Email</Form.Label>
            <Form.Control type="text" placeholder="Username or Email" name="loginField" value={state.loginField} onChange={changeHandler} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="basicPassword">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" name="pwd" value={state.pwd} onChange={changeHandler} />
          </Form.Group>

          <Button variant="success" type="submit" className='d-block mx-auto' disabled={isFormValid()}>
            Login
          </Button>

          <div className='text-center mt-3'>
            <p>If You are New User? <Link to="/Adminregister">Register</Link></p>
          </div>
        </Form>
      </Container>
    </section>
  )
}

export default Adminlogin