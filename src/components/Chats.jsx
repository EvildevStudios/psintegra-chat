import React from "react";
import { BotInfo } from "../data/BotInfo";

const Chats = () => {
    return (
        <div className="chats">
            <div
                className="userChat">
                <img src={BotInfo.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{BotInfo.username}</span>
                    <p>{BotInfo.lastMessage}</p>
                </div>
            </div>
        </div >
    );
};

export default Chats;