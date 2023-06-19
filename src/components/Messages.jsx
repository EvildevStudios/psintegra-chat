import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser.uid) return;

        const unsubscribe = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            doc.exists() && setMessages(doc.data().messages || []);
        });

        return () => {
            unsubscribe();
        };
    }, [currentUser.uid]);

    return (
        <div className="messages">
            {messages.map((message) => (
                <Message message={message} key={message.id} />
            ))}
        </div>
    );
};

export default Messages;
