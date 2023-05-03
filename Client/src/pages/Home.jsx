import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    return (
        <div className='home'>
            <div className="container">
                <Sidebar />
                <Chat />
                <ToastContainer />  
            </div>
        </div>
    )
}

export default Home