const unorm = require('unorm');
const keywordList = require('../utils/keywordList');

const keywordFilter = (req, res, next) => {
    const messages = req.body.messages;
    for (const message of messages) {
        const userInput = unorm.nfd(message.content.toLowerCase()).replace(/[\u0300-\u036f]/g, '');
        const normalizedKeywords = keywordList.map(keyword => unorm.nfd(keyword.toLowerCase()).replace(/[\u0300-\u036f]/g, ''));
        const keyword = normalizedKeywords.find(keyword => userInput.includes(keyword));

        if (!keyword) {
            return res.status(400).json({
                message: "Lo siento, como Asistente de Psintegra no puedo ayudarte con temas que no sean de salud mental."
            });
        }
    }
    next();
};

module.exports = keywordFilter;