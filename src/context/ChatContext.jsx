import React, { createContext, useState } from 'react';

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <ChatContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatContextProvider };
