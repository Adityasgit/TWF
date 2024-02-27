const express = require('express');
const bodyParser = require('body-parser');
const translate = require('translatte');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// POST endpoint for translation
app.post('/translate', async (req, res) => {
    try {
        // Check if the request body contains the required 'text' key
        if (!req.body || !req.body.text) {
            return res.status(400).json({ error: "Missing 'text' key in request body" });
        }

        const { text } = req.body;

        // Translate the text to French
        const { text: translation } = await translate(text, { to: 'fr' })

        // Send the translated text as response
        res.json({ translation });
    } catch (error) {
        console.error('Error during translation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
