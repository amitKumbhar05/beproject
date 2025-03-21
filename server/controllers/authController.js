import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Signup function
export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({ email, password: hashedPassword });
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Login function
export const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);
    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
