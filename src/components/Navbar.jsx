import React, { useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="navbar">
            <span className="logo">Libre Consejo</span>
            <div className="user">
                <img src="https://firebasestorage.googleapis.com/v0/b/psintegra-firebase.appspot.com/o/empty_user.webp?alt=media&token=2064ef82-07f5-4f18-8190-c2c42a4cdeff" alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)} className='logout-button'>
                    Cerrar sesión
                    <FiLogOut className="logout-icon" />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
