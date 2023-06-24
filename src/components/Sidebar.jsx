import React from "react";
import Navbar from "./Navbar"
import Chats from "./Chats"
import Instructions from "./Instructions";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Navbar />
            <Chats />
            <Instructions />
        </div>
    );
};

export default Sidebar;
