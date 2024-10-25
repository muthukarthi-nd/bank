const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createAdmin = async (req, res) => {
    const { username, password, accno } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const adminUser = new User({
            username,
            password: hashedPassword,
            accno,
            role: 'admin'
        });

        await adminUser.save();
        res.status(201).json({ message: 'Admin user created successfully!' });
    } catch (error) {
        console.error('Error creating admin user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
