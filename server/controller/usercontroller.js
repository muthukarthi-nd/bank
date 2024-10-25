// const Transaction = require('../models/transaction');
// const User = require('../models/user');

// exports.getUser = async (req, res) => {
//     try {
//         const { accno, username } = req.query;

//         if (!accno && !username) {
//             return res.status(400).json({ message: 'Please provide either an account number or a username.' });
//         }

//         let user;

//         if (accno) {
//             user = await User.findOne({ accno });
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found.' });
//             }

//             const userTransactions = await Transaction.find({ user_id: user._id });
//             return res.status(200).json({
//                 success: true,
//                 data: {
//                     user,
//                     transactions: userTransactions.map(transaction => ({
//                         type: transaction.type,
//                         amount: transaction.amount,
//                         date:transaction.date,
//                         currentbalance: transaction.currentbalance,
//                     })),
//                 }
//             });
//         }

//         // Find user by username
//         if (username) {
//             const users = await User.find({ username }); 
//             if (!users.length) {
//                 return res.status(404).json({ message: 'User not found.' });
//             }

//             return res.status(200).json({
//                 success: true,
//                 data: users.map(user => ({
//                     username: user.username,
//                     accno: user.accno,
//                     currentbalance: user.currentbalance,
//                 })),
//             });
//         }
//     } catch (error) {
//         console.error('Error retrieving user data:', error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };





const userConnector = require('../connectors/userConnector');

exports.getUser = async (req, res) => {
try {
const { accno, username } = req.query;

if (!accno && !username) {
return res.status(400).json({ message: 'Please provide either an account number or a username.' });
        }

        let user;

        if (accno) {
            user = await userConnector.findUserByAccno(accno);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const userTransactions = await userConnector.findTransactionsByUserId(user._id);
            return res.status(200).json({
                success: true,
                data: {
                    user,
                    transactions: userTransactions.map(transaction => ({
                        type: transaction.type,
                        amount: transaction.amount,
                        date: transaction.date,
                        currentbalance: transaction.currentbalance,
                    })),
                }
            });
        }

        if (username) {
            const users = await userConnector.findUserByUsername(username); 
            if (!users.length) {
                return res.status(404).json({ message: 'User not found.' });
            }

            return res.status(200).json({
                success: true,
                data: users.map(user => ({
                    username: user.username,
                    accno: user.accno,
                    currentbalance: user.currentbalance,
                })),
            });
        }
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
