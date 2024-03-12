const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
