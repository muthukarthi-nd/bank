const mongoose = require('mongoose');

const reglogSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    accno: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('reglog', reglogSchema);
