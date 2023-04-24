const { config } = require("../config/gpt.config");

/**
 * Retrieves all the available OpenAI engines
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 */

const getEngines = async (req, res) => {
    const openai = await config();
    const engines = await openai.listEngines();

    res.status(200).json({
        engines: engines.data,
    })
};

/**
 * Generates a response from the OpenAI API based on a given model and a set of messages
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 */

const postChatRequest = async (req, res) => {
    const openai = await config();
    const { model, messages } = req.body;

    // Create an array to hold the chat messages
    const chatMessages = [];

    // Loop through each message in the request body
    for (const message of messages) {
        // Get the content of the message
        const chatContent = message.content;
        const chatRole = message.role;

        // Add the message to the chat messages array
        chatMessages.push({ role: chatRole, content: chatContent });
    }

    // Create the chat request object
    const chatRequest = {
        model: "gpt-3.5-turbo",
        messages: chatMessages,
    };

    // Send the chat request to OpenAI
    const openaiResponse = await openai.createChatCompletion(chatRequest);
    const chatResponse = openaiResponse.data.choices[0].messagex;

    // Return the chat response to the client
    res.status(200).json({
        chatResponse: chatResponse,
    });
};

module.exports = { getEngines, postChatRequest };
