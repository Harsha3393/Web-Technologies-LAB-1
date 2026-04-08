const express = require('express');
const app = express();

// Middleware 1 (logger)
app.use((req, res, next) => {
    console.log(`Method: ${req.method}, URL: ${req.url}, Time: ${new Date()}`);
    next();
});

// Middleware 2
app.use((req, res, next) => {
    console.log("Second middleware executed");
    next();
});

// Route
app.get('/', (req, res) => {
    res.send("Middleware working!");
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});