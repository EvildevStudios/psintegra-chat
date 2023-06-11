import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { AI } from "../common/AI";

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
