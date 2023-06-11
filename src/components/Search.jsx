import React, { useContext, useState, useEffect } from "react";
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Search = () => {
    const [user, setUser] = useState(null);
    const [hasExistingChat, setHasExistingChat] = useState(undefined); // Set initial value to undefined

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("username", "==", "Asistente de Psintegra")
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            toast.error("Error searching user");
        }
    };

    const hasChatWithUser = async (currentUser, user) => {
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;

        try {
            const docRefCurrentUser = doc(db, "userChats", currentUser.uid);
            const docSnapCurrentUser = await getDoc(docRefCurrentUser);
            const userChatData = docSnapCurrentUser.data();
            const hasExistingChat = userChatData && userChatData[combinedId];

            setHasExistingChat(hasExistingChat);
        } catch (err) {
            toast.error("Error checking if chat exists");
        }
    };


    useEffect(() => {
        handleSearch();
    }, []);

    useEffect(() => {
        if (user && currentUser) {
            hasChatWithUser(currentUser, user);
        }
    }, [user, currentUser]);

    const handleSelect = async () => {
        if (hasExistingChat === undefined) { // Check if hasExistingChat is undefined
            const combinedId =
                currentUser.uid > user.uid
                    ? currentUser.uid + user.uid
                    : user.uid + currentUser.uid;

            try {
                // Create a chat in the chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                // Create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId]: {
                        userInfo: {
                            uid: user.uid,
                            username: user.username,
                            photoURL: user.photoURL,
                        },
                        date: serverTimestamp(),
                    },
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId]: {
                        userInfo: {
                            uid: currentUser.uid,
                            username: currentUser.username,
                            photoURL: currentUser.photoURL,
                        },
                        date: serverTimestamp(),
                    },
                });

            } catch (err) {
                toast.error("Error creating chat");
            }
        }

        setUser(null);
    };

    return (
        <div className="search">
            {user && hasExistingChat === undefined && (
                <div className="userChat">
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user.username}</span>
                    </div>
                    <button className="add-user" onClick={handleSelect}>Add</button>
                </div>
            )}
        </div>
    );
};

export default Search;
