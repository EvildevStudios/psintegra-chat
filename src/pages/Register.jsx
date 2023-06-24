import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        // Validar longitud de la contraseña
        if (password.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres");
            setLoading(false);
            return;
        }

        try {
            // Crear usuario
            const res = await createUserWithEmailAndPassword(auth, email, password);

            try {
                // Actualizar perfil
                await updateProfile(res.user, {
                    displayName: username
                });

                // Crear usuario en Firestore
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    username,
                    email
                });

                // Crear chats vacíos para el usuario en Firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
            } catch (err) {
                toast.error("Error al crear el usuario");
                setLoading(false);
            }
        } catch (err) {
            toast.error("Error al crear el usuario");
            setLoading(false);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <img src="/src/img/logo.png" alt="" className="logo" />
                <span className="title">Registro</span>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder="nombre de usuario" />
                    <input required type="email" placeholder="correo electrónico" />
                    <input required type="password" placeholder="contraseña" />
                    <button disabled={loading}>Registrarse</button>
                    {loading && "Por favor espera..."}
                </form>
                <p>
                    ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
