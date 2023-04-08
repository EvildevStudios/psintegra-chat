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

        // Add the message to the chat messages array
        chatMessages.push({ role: "user", content: chatContent });
    }

    // Create the chat request object
    const chatRequest = {
        model: model ? model : "gpt-3.5-turbo",
        messages: chatMessages,
    };

    // Send the chat request to OpenAI
    const chatResponse = await openai.createChatCompletion(chatRequest);

    // Return the chat response to the client
    res.status(200).json({
        chatResponse: chatResponse.data,
    });
};

module.exports = { getEngines, postChatRequest };
