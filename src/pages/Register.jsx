import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
        const file = e.target[3].files[0];

        // Validate password length
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            // Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${username + date}`);

            let downloadURL = ""; // Default photo URL

            if (file) {
                // If user uploaded a file
                await uploadBytesResumable(storageRef, file);
                downloadURL = await getDownloadURL(storageRef);
            } else {
                // If user didn't upload a file, use the default photo URL
                downloadURL = "https://firebasestorage.googleapis.com/v0/b/psintegra-db.appspot.com/o/empty.webp?alt=media&token=c23cd900-365b-4d49-a3ea-7e5b131e62b4";
            }

            try {
                // Update profile
                await updateProfile(res.user, {
                    username,
                    photoURL: downloadURL,
                });

                // Create user on firestore
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    username,
                    email,
                    photoURL: downloadURL,
                });

                // Create empty user chats on firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
            } catch (err) {
                console.log(err);
                setErr(true);
                setLoading(false);
            }
        } catch (err) {
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
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <button disabled={loading}>Sign up</button>
                    {loading && "Please wait..."}
                </form>
                <p>
                    You do have an account? <Link to="/login">Login</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;