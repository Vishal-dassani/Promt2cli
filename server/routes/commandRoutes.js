const express = require('express');
const { generateCommand } = require('../services/aiService');
const router = express.Router();

// POST: Generate a terminal command
router.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || !prompt.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Prompt is required'
            });
        }

        const command = await generateCommand(prompt);

        return res.status(200).json({
            success: true,
            prompt,
            command
        });

    } catch (error) {
        console.error('Command generation failed:', error);

        return res.status(500).json({
            success: false,
            error: 'Failed to generate command'
        });
    }
});

module.exports = router;