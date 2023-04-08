const { Configuration, OpenAIApi } = require("openai");

/**
 * Establishes the OpenAI API configuration
 * @returns {Promise<OpenAIApi>} A promise that resolves with an OpenAIApi instance
 */

const config = async () => {
    const configuration = new Configuration({
        organization: process.env.YOUR_ORG_ID,
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    return openai;
};

module.exports = { config };