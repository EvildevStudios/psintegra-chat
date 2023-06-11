import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";

const AI = {
    uid: "ZxCiDcBnT7Y3yZwtJIBowWprRLZ2",
    displayName: "Psintegra Assistant",
    photoURL:
        "https://firebasestorage.googleapis.com/v0/b/psintegra-db.appspot.com/o/psintegra-assistant.png?alt=media&token=eca83bca-d55e-4511-aff5-75f534ca3651&_gl=1*127z5bf*_ga*MTA3MzQxOTIwOS4xNjg2MzUyMTkx*_ga_CW55HF8NVT*MTY4NjM2MzU4Ni4yLjEuMTY4NjM2NTI5Mi4wLjAuMA..",
};

const Input = () => {
    const [text, setText] = useState("");
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (!text) {
            toast.error("Please type something before sending");
            return;
        }

        const message = {
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: new Date().toISOString(),
        };
        setText("");

        try {
            const chatDocRef = doc(db, "chats", data.chatId);
            const userChatsDocRef = doc(db, "userChats", currentUser.uid);

            await Promise.all([
                updateDoc(chatDocRef, { messages: arrayUnion(message) }),
                updateDoc(userChatsDocRef, {
                    [`${data.chatId}.lastMessage.text`]: message.text,
                    [`${data.chatId}.date`]: serverTimestamp(),
                }),
            ]);

            const response = await axios.post("/openai/chat", {
                messages: [{ role: "user", content: text }],
            });

            const responseMessage = response.data.chatResponse.content;

            const aiMessage = {
                id: uuid(),
                text: responseMessage,
                senderId: AI.uid,
                date: new Date().toISOString(),
            };

            await updateDoc(chatDocRef, { messages: arrayUnion(aiMessage) });
        } catch (error) {
            console.log("Error:", error);

            const errorMessage = error.response?.data?.message || "An error occurred";

            const chatDocRef = doc(db, "chats", data.chatId);
            const errorLog = {
                id: uuid(),
                text: errorMessage,
                senderId: AI.uid,
                date: new Date().toISOString(),
            };

            await updateDoc(chatDocRef, { messages: arrayUnion(errorLog) });
        }
    };

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="send">
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Input;
