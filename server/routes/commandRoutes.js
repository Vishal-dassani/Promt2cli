const express = require('express');
const { generateCommand } = require('../services/aiService');
const router = express.Router();

// POST: Generate a terminal command
router.post('/generate', async (req, res) => {
    try {
        const { prompt, shell = 'powershell' } = req.body;

        if (typeof prompt !== 'string' || !prompt.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Prompt is required'
            });
        }

        if (!['powershell', 'bash', 'zsh'].includes(shell)) {
            return res.status(400).json({
                success: false,
                error: 'Unsupported shell'
            });
        }

        const generatedCommand = await generateCommand(prompt, shell);
        if (typeof generatedCommand.command !== 'string' || !generatedCommand.command.trim()) {
            return res.status(502).json({
                success: false,
                error: `No command was generated for ${shell}`
            });
        }

        return res.status(200).json({
            success: true,
            prompt,
            platform: shell,
            command: generatedCommand.command,
            riskAssessment: generatedCommand.riskAssessment
        });

    } catch (error) {
        console.error('Command generation failed:', error);

        var statusCode = 500;
        var errorMessage = 'Failed to generate command';

        if (error && Number.isInteger(error.status) && error.status >= 400 && error.status <= 599) {
            statusCode = error.status;
        }

        if (error && typeof error.message === 'string' && error.message.trim()) {
            errorMessage = error.message;
        }
        

        return res.status(statusCode).json({
            success: false,
            error: errorMessage
        });
    }
});

module.exports = router;