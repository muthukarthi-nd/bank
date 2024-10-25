
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');


// exports.register = async (req, res) => {
//     const { username, accno, password, role } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
        
//         const userRole = role || 'user';

//         const user = new User({ username, accno, password: hashedPassword, role: userRole });

//         await user.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Registration Error:', error);
//         res.status(500).json({ error: 'User registration failed' });
//     }
// };

// exports.login = async (req, res) => {
//     const { accno, password } = req.body;

//     try {
//         const user = await User.findOne({ accno });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid account number or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid account number or password' });
//         }

//         if (user.role === 'user') {
//             const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             console.log('Generated Token:', token);

//             res.cookie('token', token, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//                 maxAge: 3600000, 
//             });
//         }
        
//         if (user.role === 'admin') {
//             res.json({ message: 'Admin login successful', user: { username: user.username, accno: user.accno, role: user.role } });
//         } else {
//             res.json({ message: 'User login successful', user: { username: user.username, accno: user.accno, role: user.role } });
//         }
//     } catch (error) {
//         console.error('Login Error:', error);
//         res.status(500).json({ error: 'Login failed' });
//     }
// };





const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    const { username, accno, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role || 'user';

        const user = new User({ username, accno, password: hashedPassword, role: userRole });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'User registration failed' });
    }
};

exports.login = async (req, res) => {
    const { accno, password } = req.body;

    try {
        const user = await User.findOne({ accno });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid account number or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ message: 'Invalid account number or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
        });

        res.json({
            token, 
            user: { username: user.username, accno: user.accno, role: user.role },
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

