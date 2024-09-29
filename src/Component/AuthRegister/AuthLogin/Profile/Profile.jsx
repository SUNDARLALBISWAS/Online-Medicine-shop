import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import './Profile.css'; // Import the custom CSS

const Profile = () => {
    const [state, setState] = useState();
    const { id } = useParams();
    const api = `http://localhost:1000/auth/${id}`;
    const navigate = useNavigate();

    const getDetails = () => {
        axios.get(api).then((result) => {
            setState(result.data);
            window.sessionStorage.setItem("First_Name", result.data.first_name);
            window.sessionStorage.setItem("Profileimg", result.data.image);
            window.sessionStorage.setItem("id", result.data.id);
        })
            .catch((error) => {
                console.log("Error", error);
            });
    }

    useEffect(() => {
        getDetails();
    }, [api]);

    const logOut = () => {
        window.sessionStorage.removeItem("isUserLogged");
        window.sessionStorage.removeItem("first_name");
        window.sessionStorage.removeItem("profileimg");
        window.sessionStorage.removeItem("id");
        navigate('/');
    }

    return (
        <section className="profile-section">
            <Container className="profile-container">
                <div className="profile-content">
                    <img src={state?.image} alt="Profile" className="profile-img" />
                    <h4><b>Name:</b> {state?.fname} {state?.lname}</h4>
                    <h4><b>Email:</b> {state?.email}</h4>
                    <Button variant="success" onClick={logOut} className="logout-btn">
                        Log Out
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default Profile;
