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
            else {
                // Set default chat with AI
                const AI = {
                    uid: "ZxCiDcBnT7Y3yZwtJIBowWprRLZ2",
                    displayName: "Psintegra Assistant",
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/psintegra-db.appspot.com/o/empty.webp?alt=media&token=c23cd900-365b-4d49-a3ea-7e5b131e62b4&_gl=1*1ev2w81*_ga*MTA3MzQxOTIwOS4xNjg2MzUyMTkx*_ga_CW55HF8NVT*MTY4NjM1MjE5MS4xLjEuMTY4NjM1NTYzOC4wLjAuMA..",
                }
                setChats({ [AI.uid]: { userInfo: AI, date: Date.now() } });
            }
        });

        return () => unsubscribe();
    }, [currentUser.uid]);

    const handleSelect = async (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });

        // Check whether the group (chats in Firestore) exists, if not create
        const combinedId =
            currentUser.uid > u.uid
                ? currentUser.uid + u.uid
                : u.uid + currentUser.uid;
        try {
            const chatRef = doc(db, "chats", combinedId);
            const chatSnapshot = await getDoc(chatRef);

            if (!chatSnapshot.exists()) {
                // Create a chat in chats collection
                await setDoc(chatRef, { messages: [] });

                // Create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [`${combinedId}.userInfo`]: {
                        uid: u.uid,
                        displayName: u.displayName,
                        photoURL: u.photoURL,
                    },
                    [`${combinedId}.date`]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", u.uid), {
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
