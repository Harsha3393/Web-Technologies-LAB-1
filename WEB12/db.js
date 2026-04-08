const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/testDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Model
const User = mongoose.model('User', userSchema);

// CREATE
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
});

// READ
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// UPDATE
app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
});

// DELETE
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");
});

app.listen(3002, () => {
    console.log("Server running on http://localhost:3002");
});
app.get('/add', async (req, res) => {
    const user = new User({ name: "Moks", age: 20 });
    await user.save();
    res.send("User added");
});