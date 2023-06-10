import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const picture = "https://firebasestorage.googleapis.com/v0/b/psintegra-db.appspot.com/o/empty.webp?alt=media&token=c23cd900-365b-4d49-a3ea-7e5b131e62b4&_gl=1*1ev2w81*_ga*MTA3MzQxOTIwOS4xNjg2MzUyMTkx*_ga_CW55HF8NVT*MTY4NjM1MjE5MS4xLjEuMTY4NjM1NTYzOC4wLjAuMA..";

        // Validate password length
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            // Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // Update profile
            await updateProfile(res.user, { displayName: username, photoURL: picture });

            // Create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                username,
                email,
                picture
            });

            // Create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            toast.success("Account created successfully");
            navigate("/");
        } catch (err) {
            toast.error("Something went wrong");
            setErr(true);
            setLoading(false);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Psintegra Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder="username" />
                    <input required type="email" placeholder="email" />
                    <input required type="password" placeholder="password" />
                    <button disabled={loading}>Sign up</button>
                    {loading && "Please wait..."}
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
