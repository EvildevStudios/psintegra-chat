import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { BotInfo } from "../data/BotInfo";

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const [timeElapsed, setTimeElapsed] = useState("");

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });

        // Calculate the time elapsed since the message was sent
        const messageTime = new Date(message.date).getTime();
        const currentTime = new Date().getTime();
        const elapsed = Math.floor((currentTime - messageTime) / 1000); // en segundos

        if (elapsed < 60) {
            setTimeElapsed(`Justo ahora`);
        } else if (elapsed < 3600) {
            const minutes = Math.floor(elapsed / 60);
            setTimeElapsed(`${minutes} minutos atrás`);
        } else if (elapsed < 86400) {
            const hours = Math.floor(elapsed / 3600);
            setTimeElapsed(`${hours} horas atrás`);
        } else {
            const days = Math.floor(elapsed / 86400);
            setTimeElapsed(`${days} días atrás`);
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
                            ? "/src/img/empty.webp"
                            : BotInfo.photoURL
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
