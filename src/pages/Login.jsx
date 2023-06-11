import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in successfully");
            navigate("/")
        } catch (err) {
            toast.error("Something went wrong");
        }
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Psintegra Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>Sign in</button>
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
            <ToastContainer />  
        </div>
    );
};

export default Login;
