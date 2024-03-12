const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name: String,
    type: {
        type: String,
        enum: ["income", "expense"]
    },
    category: String,
    amount: Number,
    date: Date,
    every: String,
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;