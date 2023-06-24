import React, { useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="navbar">
            <span className="logo">Psintegra Chat</span>
            <div className="user">
                <img src="/src/img/empty.webp" alt="" />
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
