import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { BotInfo } from "../data/BotInfo";

const Input = () => {
    const [text, setText] = useState("");
    const { currentUser } = useContext(AuthContext);

    const handleSend = async () => {
        const userChatsDocRef = doc(db, "userChats", currentUser.uid);

        if (!text) {
            toast.error("Por favor, escribe algo antes de enviarlo");
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
            await Promise.all([
                updateDoc(userChatsDocRef, {
                    messages: arrayUnion(message),
                    lastMessage: message,
                    lastMessageDate: serverTimestamp(),
                }),
            ]);

            const response = await axios.post("/openai/chat", {
                messages: [{ role: "user", content: message.text }],
            });

            const responseMessage = response.data.chatResponse.content;

            const aiMessage = {
                id: uuid(),
                text: responseMessage,
                senderId: BotInfo.uid,
                date: new Date().toISOString(),
            };

            await updateDoc(userChatsDocRef, {
                messages: arrayUnion(aiMessage),
                lastMessage: aiMessage,
                lastMessageDate: serverTimestamp(),
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Ocurrió un error";

            const errorLog = {
                id: uuid(),
                text: errorMessage,
                senderId: BotInfo.uid,
                date: new Date().toISOString(),
            };

            await updateDoc(userChatsDocRef, {
                messages: arrayUnion(errorLog),
                lastMessage: errorLog,
                lastMessageDate: serverTimestamp(),
            });
        }
    };

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSend();
                    }
                }}
            />
            <div className="send">
                <button onClick={handleSend}>Enviar</button>
            </div>
        </div>
    );
};

export default Input;
