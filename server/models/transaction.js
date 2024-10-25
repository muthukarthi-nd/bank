const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: Number,
    username:String, 
    accno: String, 
    amount: { type: Number, required: true },
    currentbalance: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

module.exports = mongoose.model('Transaction', transactionSchema);
