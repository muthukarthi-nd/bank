// const jwt = require('jsonwebtoken');
// const { getUserByAccountNumber, saveTransaction } = require('../connectors/transactionConnector');
// const User = require('../models/user');

// const TRANSACTION_TYPES = {
//   DEPOSIT: 1,
//   WITHDRAWAL: 0,
// };

// exports.controller = async (req, res) => {
//   try {
//     const token = 
//       (req.cookies && req.cookies.token) || 
//       (req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null);

//     let user;

//     if (token) {
//       console.log('Token:', token);
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const userId = decoded.id;

//         user = await User.findById(userId);
//         if (!user) {
//           return res.status(401).json({ message: 'Invalid user.' });
//         }
//       } catch (err) {
//         return res.status(401).json({ message: 'Token is expired or invalid.' });
//       }
//     } else {
//       const { accno } = req.body;
//       if (!accno) {
//         return res.status(400).json({ message: 'Account number is required.' });
//       }

//       user = await getUserByAccountNumber(accno);
//       if (!user) {
//         return res.status(400).json({ message: 'New users are not allowed to withdraw or deposit.' });
//       }
//     }

//     const { type, amount } = req.body;

//     if (type === undefined || amount === undefined) {
//       return res.status(400).json({ message: 'Transaction type and amount are required.' });
//     }

//     if (typeof amount !== 'number' || amount <= 0) {
//       return res.status(400).json({ message: 'Amount must be a positive number.' });
//     }

//     user.currentbalance = user.currentbalance || 0;
//     console.log('Initial Balance:', user.currentbalance);

//     const date = new Date();

//     if (type === TRANSACTION_TYPES.DEPOSIT) {
//       user.currentbalance += amount;
//     } else if (type === TRANSACTION_TYPES.WITHDRAWAL) {
//       if (user.currentbalance < amount) {
//         return res.status(400).json({ message: 'Insufficient balance.' });
//       }
//       user.currentbalance -= amount;
//     } else {
//       return res.status(400).json({ message: 'Invalid transaction type.' });
//     }

//     console.log('Updated Balance:', user.currentbalance);

//     user.date = date;
//     await user.save(); 

//     const transactionData = {
//       user_id: user._id,
//       type,
//       amount,
//       currentbalance: user.currentbalance,
//       dateTime: date,
//     };
//     await saveTransaction(transactionData); 

//     res.status(200).json({
//       message: type === TRANSACTION_TYPES.DEPOSIT ? 'Deposit successful!' : 'Withdrawal successful!',
//       amount,
//       user,
//     });
//   } catch (error) {
//     console.error('Transaction error:', error);
//     res.status(500).json({ message: 'Internal server error.', error: error.message });
//   }
// };



















const jwt = require('jsonwebtoken');
const { getUserByAccountNumber, saveTransaction } = require('../connectors/transactionConnector');
const User = require('../models/user');

const TRANSACTION_TYPES = {
  DEPOSIT: 1,
  WITHDRAWAL: 0,
};

exports.controller = async (req, res) => {
  try {
    // Safely access the token
    const token = req.cookies?.token || (req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null);
    console.log('Token:', token); // Log the token for debugging

    let user;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        user = await User.findById(userId);
        if (!user) {
          return res.status(401).json({ message: 'Invalid user.' });
        }
      } catch (err) {
        return res.status(401).json({ message: 'Token is expired or invalid.' });
      }
    } else {
      const { accno } = req.body;
      if (!accno) {
        return res.status(400).json({ message: 'Account number is required.' });
      }

      user = await getUserByAccountNumber(accno);
      if (!user) {
        return res.status(400).json({ message: 'New users are not allowed to withdraw or deposit.' });
      }
    }

    const { type, amount } = req.body;

    if (type === undefined || amount === undefined) {
      return res.status(400).json({ message: 'Transaction type and amount are required.' });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number.' });
    }

    user.currentbalance = user.currentbalance || 0;
    console.log('Initial Balance:', user.currentbalance);

    const date = new Date();

    if (type === TRANSACTION_TYPES.DEPOSIT) {
      user.currentbalance += amount;
    } else if (type === TRANSACTION_TYPES.WITHDRAWAL) {
      if (user.currentbalance < amount) {
        return res.status(400).json({ message: 'Insufficient balance.' });
      }
      user.currentbalance -= amount;
    } else {
      return res.status(400).json({ message: 'Invalid transaction type.' });
    }

    console.log('Updated Balance:', user.currentbalance);

    user.date = date;
    await user.save(); 

    const transactionData = {
      user_id: user._id,
      type,
      amount,
      currentbalance: user.currentbalance,
      dateTime: date,
    };
    await saveTransaction(transactionData); 

    res.status(200).json({
      message: type === TRANSACTION_TYPES.DEPOSIT ? 'Deposit successful!' : 'Withdrawal successful!',
      amount,
      user,
    });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};
