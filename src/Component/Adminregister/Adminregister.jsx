import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import base_url, { end_point } from '../../Api/Api';
import { useNavigate,Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

const Adminregister = () => {

    const Navigate = useNavigate();
    const api = base_url + end_point.admin;
    let [showpwd, setShowpwd] = useState(false);
    let togglePss = () => {
        setShowpwd(!showpwd)
    }
    const [inputState, setInput] = useState({
        usrn: "",
        mail: "",
        pwd: "",
        errors: {
            usrn: "",
            mail: "",
            pwd: ""
        }
    });

    const [olddata, setOlddata] = useState([]);
    useEffect(() => {
        axios.get(api)
            .then((result) => {
                setOlddata(result.data);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, [api]);
    const emailRegex = /^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/;

    const changeHandler = (event) => {
        const { name, value } = event.target;
        const err = { ...inputState.errors };

        switch (name) {
            case 'usrn':
                err.usrn = value.length < 1 ? "Required Field" :
                    (value.length < 5 ? "Minimum 5 Character Required" : "");
                break;
            case 'mail':
                err.mail = value.length < 1 ? "Required Field" :
                    (!emailRegex.test(value) ? "Invalid Email Format" : "");
                break;
            case 'pwd':
                err.pwd = value.length < 1 ? "Required Field" :
                    (value.length < 4 ? "Minimum 4 Character Required" : "");
                break;
            default:
                console.log("Not Applicable");
        }
        setInput({ ...inputState, [name]: value, errors: err });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log("Submit Value", inputState);

        let registerEmail = olddata.find((user) => user.email === inputState.mail);
        let registerUsername = olddata.find((user) => user.username === inputState.usrn);

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
                username: inputState.usrn,
                email: inputState.mail,
                password: inputState.pwd,
            };

            axios.post(api, formData)
                .then(result => {
                    console.log("Result", result);
                    if (result.status === 200 || result.status === 201) {
                        Swal.fire({
                            title: 'Success!',
                            text: result.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        Navigate("/Adminlogin");
                    }
                })
                .catch(error => {
                    console.error("Error", error);
                });
        }
    };

    const myFunction = () => {
        return (
            inputState.usrn === "" || inputState.mail === "" || inputState.pwd === "" || inputState.errors.usrn !== "" || inputState.errors.mail !== "" || inputState.errors.pwd !== ""
        )
    }
    return (
        <section className='py-5'>
            <Container>
                <h2 className='text-center mb-4'>Admin Register</h2>
                <Form onSubmit={submitHandler}>
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

                    <div className='text-center'>
                        <Button variant='success' type='submit' disabled={myFunction()}>
                            Register
                        </Button>
                    </div>
                    <div className='text-center mt-3'>
                        <p>If You Already Create an Account? <Link to="/Adminlogin">Log In</Link></p>
                    </div>
                </Form>
            </Container>
        </section>
    )
}

export default Adminregister;