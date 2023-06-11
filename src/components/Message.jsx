import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const [timeElapsed, setTimeElapsed] = useState("");

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });

        // Calculate the time elapsed since the message was sent
        const messageTime = new Date(message.date).getTime();
        const currentTime = new Date().getTime();
        const elapsed = Math.floor((currentTime - messageTime) / 1000); // in seconds

        if (elapsed < 60) {
            setTimeElapsed(`${elapsed} seconds ago`);
        } else if (elapsed < 3600) {
            const minutes = Math.floor(elapsed / 60);
            setTimeElapsed(`${minutes} minutes ago`);
        } else if (elapsed < 86400) {
            const hours = Math.floor(elapsed / 3600);
            setTimeElapsed(`${hours} hours ago`);
        } else {
            const days = Math.floor(elapsed / 86400);
            setTimeElapsed(`${days} days ago`);
        }
    }, [message]);

    return (
        <div
            ref={ref}
            className={`message ${message.senderId === currentUser.uid && "owner"}`}
        >
            <div className="messageInfo">
                <img
                    src={
                        message.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : data.user.photoURL
                    }
                    alt=""
                />
                <span>{timeElapsed}</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
};

export default Message;
