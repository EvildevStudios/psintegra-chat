import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { BotInfo } from "../data/BotInfo";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { isLoading } = useContext(ChatContext);

    useEffect(() => {
        if (!currentUser.uid) return;

        const unsubscribe = onSnapshot(
            doc(db, "userChats", currentUser.uid),
            (doc) => {
                doc.exists() && setMessages(doc.data().messages || []);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [currentUser.uid]);

    return (
        <div className="messages">
            {messages.map((message) => (
                <Message message={message} key={message.id} />
            ))}
            {isLoading && <Message
                message={{
                    text: BotInfo.writing,
                    senderId: BotInfo.uid,
                    date: new Date().getTime()
                }}
            />}
        </div>
    );
};

export default Messages;
