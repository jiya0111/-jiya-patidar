const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// API Route
app.post('/process-array', (req, res) => {
    const { userId, emailId, collegeRoll, array } = req.body;

    // Validate input
    if (!userId || !emailId || !collegeRoll || !Array.isArray(array)) {
        return res.status(400).json({
            status: 'Failure',
            message: 'Invalid input. Ensure User ID, Email ID, College Roll, and Array are provided.'
        });
    }

    // Process the array
    const evenNumbers = array.filter(item => typeof item === 'number' && item % 2 === 0);
    const oddNumbers = array.filter(item => typeof item === 'number' && item % 2 !== 0);
    const alphabets = array
        .filter(item => typeof item === 'string' && /^[a-zA-Z]+$/.test(item))
        .map(item => item.toUpperCase());

    // Response
    res.status(200).json({
        status: 'Success',
        userId,
        emailId,
        collegeRoll,
        evenNumbers,
        oddNumbers,
        alphabets
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
