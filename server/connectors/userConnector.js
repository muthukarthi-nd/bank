const Transaction = require('../models/transaction');
const User = require('../models/user');

exports.findUserByAccno = async (accno) => {
return await User.findOne({ accno });
};

exports.findUserByUsername = async (username) => {
return await User.find({ username });
};

exports.findTransactionsByUserId = async (userId) => {
return await Transaction.find({ user_id: userId });
};
