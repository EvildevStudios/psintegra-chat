import React, { useState, useEffect } from "react";
import axios from "axios";
import Messages from "./Messages";
import Input from "./Input";
import { BotInfo } from "../data/BotInfo";

const Chat = () => {
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        // Function to check API status
        const checkAPIStatus = () => {
            axios.get("/openai/engines")
                .then(response => {
                    setIsOnline(true);
                })
                .catch(() => {
                    setIsOnline(false);
                });
        };

        // Initial check on component mount
        checkAPIStatus();

        // Periodically check API status every 10 seconds
        const interval = setInterval(checkAPIStatus, 10000);

        // Clear interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="chat">
            <div className="chatInfo">
                <span className="chatName">{BotInfo.username}</span>
                <span className={`statusIndicator ${isOnline ? "online" : "offline"}`}></span>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;
