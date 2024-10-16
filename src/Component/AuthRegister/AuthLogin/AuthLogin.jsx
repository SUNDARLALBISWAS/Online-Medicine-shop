import React, { useState, useEffect } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import base_url, { end_point } from '../../../Api/Api';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

const Authlogin = () => {
    const navigate = useNavigate();
    const api = base_url + end_point.register;

    let [showpwd, setShowpwd] = useState(false);
    const togglePss = () => {
        setShowpwd(!showpwd)
    }
    const [inputState, setInputState] = useState({
        loginField: '',
        pwd: '',
        errors: {
            loginField: '',
            pwd: '',
        },
    });

    const [oldData, setOldData] = useState([]);

    const getLogin = () => {
        axios.get(api).then((result) => {
            setOldData(result.data);
        }).catch((error) => {
            console.log("Error", error);
        });
    }

    useEffect(() => {
        getLogin();
    }, [getLogin, api]);

    const changeHandler = (event) => {
        const { name, value } = event.target;
        let err = { ...inputState.errors };

        switch (name) {
            case 'loginField':
                err.loginField = value.length < 1 ? "Username or Email is required" : '';
                break;
            case 'pwd':
                err.pwd = value.length < 1 ? "Password is required" : '';
                break;
            default:
                break;
        }
        setInputState({ ...inputState, [name]: value, errors: err });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const { loginField, pwd } = inputState;

        const user = oldData.find(({ email, username, password }) => {
            const isLoginFieldMatch = email === loginField || username === loginField;
            const isPasswordMatch = password === pwd;
            return isLoginFieldMatch && isPasswordMatch;
        });

        if (user) {
            Swal.fire({
                title: 'Login Successful!',
                text: 'You have successfully logged in.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            window.sessionStorage.setItem("isUserLogged", "true");
            window.sessionStorage.setItem("id", user.id);
            window.sessionStorage.setItem("profileImage", user.image);
            navigate(`/profileuser/${user.id}`);
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
        return (inputState.loginField === "" || inputState.pwd === "" || inputState.errors.loginField !== "" || inputState.errors.pwd !== "");
    };

    return (
        <section className="py-3">
            <Container>
                <div className="login-form-container">
                    <h2 className="login-header">Login</h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="loginField">
                            <Form.Label>Enter Username or Email</Form.Label>
                            <Form.Control type="text" placeholder="Username or Email" name="loginField" value={inputState.loginField} onChange={changeHandler} />
                            {inputState.errors.loginField && (
                                <p className="text-end text-danger">{inputState.errors.loginField}</p>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="basicPassword">
                            <Form.Label>Enter Password</Form.Label>
                            <div className='input-group'>
                                <Form.Control type={showpwd ? "text" : "password"} placeholder="Enter Password" name="pwd" value={inputState.pwd} onChange={changeHandler} />
                                <span className='input-group-text' onClick={togglePss} style={{ cursor: "pointer" }}>
                                    {showpwd ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {inputState.errors.pwd && (
                                <p className="text-end text-danger">{inputState.errors.pwd}</p>
                            )}
                        </Form.Group>

                        <div className="login-button">
                            <Button variant="success" type="submit" disabled={isFormValid()}>
                                Login
                            </Button>
                        </div>

                        <div className='text-center mt-3'>
                            <p>If You are New User? <Link to="/Sign-Up">Register</Link></p>
                        </div>
                    </Form>
                </div>
            </Container>
        </section>
    );
};

export default Authlogin;
