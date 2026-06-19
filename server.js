import express from 'express';

const app = express();

// --- 1. MIDDLEWARE (The Translators) ---
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// --- 2. ROUTES (The Traffic Cops) ---

// The GET route: What happens when a user first visits the page
app.get('/', (req, res) => {
    res.render('index', { originalText: '', redactedText: '' });
});

// The POST route: What happens when the user clicks the "Redact" button
app.post('/redact', (req, res) => {
    const originalText = req.body.sensitiveDocument;

    // If the user submits an empty form, just return empty
    if (!originalText) {
        return res.render('index', { originalText: '', redactedText: '' });
    }

    let processedText = originalText;

    // --- 3. PHASE 3: THE REGEX ENGINE ---

    // 1. Email Redaction
    processedText = processedText.replace(
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, 
        '[EMAIL_REDACTED]'
    );

    // 2. Phone Number Redaction (HOTFIX APPLIED)
    // Now catches 3-3-4 grouping (US) AND 5-5 grouping (International/India)
    processedText = processedText.replace(
        /(?:\+\d{1,3}[-.\s]?)?\(?\b\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b|(?:\+\d{1,3}[-.\s]?)?\b\d{5}[-.\s]?\d{5}\b/g, 
        '[PHONE_REDACTED]'
    );

    // 3. Credit Card Redaction (Catches 16-digit standard and 15-digit Amex)
    processedText = processedText.replace(
        /\b(?:\d{4}[- ]?){3}\d{4}\b|\b\d{4}[- ]?\d{6}[- ]?\d{5}\b/g, 
        '[CARD_REDACTED]'
    );

    // 4. SSN Redaction
    processedText = processedText.replace(
        /\b\d{3}[- ]?\d{2}[- ]?\d{4}\b/g, 
        '[SSN_REDACTED]'
    );

    // Send the safely redacted text back to the frontend
    res.render('index', {
        originalText: originalText,
        redactedText: processedText
    });
});

// --- 4. START THE SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Privacy Scrubber Engine running on http://localhost:${PORT}`);
});