const express = require("express");
const { check } = require("express-validator");
// Import the OpenAI controller functions
const { getEngines, postChatRequest } = require("../controllers/openai.controller");

// Import middlewares

// Import the custom middleware to filter keywords
const keywordFilter = require('../middlewares/keywordFilter');
// Import the custom middleware to validate requests
const validateRequest = require("../middlewares/validateRequest");

// Create a router
const router = express.Router();

// Route to get a list of all available OpenAI engines
router.get("/engines", getEngines);

// Route to submit a chat request to OpenAI
router.post(
    "/chat",
    // Validate the request body
    [
        check("messages", "Messages is required").not().isEmpty().isArray(),
        check("messages.*.content", "Content is required").not().isEmpty(),
    ],
    // Validate the request using the custom middleware function
    validateRequest,
    // Apply the keywordFilter middleware to the postChatRequest function
    keywordFilter,
    // Call the postChatRequest function
    postChatRequest
);

module.exports = router;