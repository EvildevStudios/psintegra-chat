import { doc, onSnapshot, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        if (!currentUser.uid) return;

        const unsubscribe = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            const messages = doc.data()?.messages;
            if (messages)
                setChats(doc.data());
            else if (!messages && currentUser.uid !== "ZxCiDcBnT7Y3yZwtJIBowWprRLZ2") {
                // Set default chat with AI
                const AI = {
                    uid: "ZxCiDcBnT7Y3yZwtJIBowWprRLZ2",
                    displayName: "Psintegra Assistant",
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/psintegra-db.appspot.com/o/psintegra-assistant.png?alt=media&token=eca83bca-d55e-4511-aff5-75f534ca3651&_gl=1*127z5bf*_ga*MTA3MzQxOTIwOS4xNjg2MzUyMTkx*_ga_CW55HF8NVT*MTY4NjM2MzU4Ni4yLjEuMTY4NjM2NTI5Mi4wLjAuMA..",
                }
                setChats({ [AI.uid]: { userInfo: AI, date: Date.now() } });
            }
        });

        return () => unsubscribe();
    }, [currentUser.uid]);

    const handleSelect = async (user) => {
        if (currentUser.uid === user.uid) {
            // Do not add AI as a chat participant
            return;
        }

        dispatch({ type: "CHANGE_USER", payload: user });

        // Check whether the group (chats in Firestore) exists, if not create
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const chatRef = doc(db, "chats", combinedId);
            const chatSnapshot = await getDoc(chatRef);

            if (!chatSnapshot.exists()) {
                // Create a chat in chats collection
                await setDoc(chatRef, { messages: [] });

                // Create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [`${combinedId}.userInfo`]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [`${combinedId}.date`]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [`${combinedId}.userInfo`]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [`${combinedId}.date`]: serverTimestamp(),
                });
            }
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    };

    return (
        <div className="chats">
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div
                    className="userChat"
                    key={chat[0]}
                    onClick={() => handleSelect(chat[1].userInfo)}
                >
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Chats;
