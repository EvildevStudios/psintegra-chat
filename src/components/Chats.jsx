import React, { useEffect, useState, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { BotInfo } from "../data/BotInfo";
import { AuthContext } from "../context/AuthContext";

const Chats = () => {
    const [lastMessage, setLastMessage] = useState("");

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser.uid) return;

        const unsubscribe = onSnapshot(
            doc(db, "userChats", currentUser.uid),
            (doc) => {
                if (doc.exists()) {
                    const messages = doc.data().messages;
                    const lastMessageText = messages[Object.keys(messages).pop()]
                        ?.text;

                    if (lastMessageText) {
                        const summary = lastMessageText
                            .split(" ")
                            .slice(0, 15)
                            .join(" ");

                        setLastMessage(
                            `${summary}${lastMessageText.split(" ").length > 15 ? "..." : ""}`
                        );
                    }
                }
            }
        );

        return () => {
            unsubscribe();
        };
    }, [currentUser.uid]);

    return (
        <div className="chats">
            <div className="userChat">
                <img src={BotInfo.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{BotInfo.username}</span>
                    <p>{lastMessage}</p>
                </div>
            </div>
        </div>
    );
};

export default Chats;
