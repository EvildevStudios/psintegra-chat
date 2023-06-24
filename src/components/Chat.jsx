import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { BotInfo } from "../data/BotInfo";

const Chat = () => {
    const { data } = useContext(ChatContext);

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{BotInfo.username}</span>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;
