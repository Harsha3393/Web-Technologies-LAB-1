const express = require('express');
const app = express();

app.use(express.json());

// Sample data
let users = [
    { id: 1, name: "Moks" },
    { id: 2, name: "Alex" }
];

// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST new user
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.json(newUser);
});

// PUT update user
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (user) {
        user.name = req.body.name;
        res.json(user);
    } else {
        res.send("User not found");
    }
});

// DELETE user
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.send("User deleted");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});