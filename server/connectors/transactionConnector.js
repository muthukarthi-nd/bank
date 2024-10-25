
const User = require('../models/user');
const Transaction = require('../models/transaction');

const getUserByAccountNumber = async (accno) => {
return await User.findOne({ accno });
};

const saveTransaction = async (transactionData) => {
const transaction = new Transaction(transactionData);
return await transaction.save();
};

module.exports = {
getUserByAccountNumber,
saveTransaction
};
