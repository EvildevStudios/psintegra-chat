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
            toast.success("Inicio de sesión exitoso");
            navigate("/");
        } catch (err) {
            toast.error("Algo salió mal");
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <img src="https://firebasestorage.googleapis.com/v0/b/psintegra-firebase.appspot.com/o/logo_site.png?alt=media&token=2bae1764-6ec0-4e29-a0de-dc5fe812259f" alt="" className="logo" />
                <span className="title">Inicio de sesión</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="correo electrónico" />
                    <input type="password" placeholder="contraseña" />
                    <button>Iniciar sesión</button>
                </form>
                <p>¿No tienes una cuenta? <Link to="/register">Registrarse</Link></p>
            </div>
            <ToastContainer />
        </div>
    );

};

export default Login;
