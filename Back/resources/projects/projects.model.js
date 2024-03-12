const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    date: Date,
    incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
