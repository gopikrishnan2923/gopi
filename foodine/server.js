const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // To allow cross-origin requests from your frontend

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/foodine', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB at mongodb://localhost:27017/foodine'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});


const User = mongoose.model('User', userSchema);

// Define Payment schema
const paymentSchema = new mongoose.Schema({
    cardNumber: String,
    cardHolder: String,
    expiryDate: String,
    cvv: String,
    paymentMethod: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

// Register route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered!' });
        }

        // Create new user
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Find user with matching email and password
    const user = await User.findOne({ email, password });
    
    if (user) {
        return res.status(200).json({ message: 'Login successful!' });
    } else {
        return res.status(400).json({ message: 'Invalid email or password!' });
    }
});

// Payment route
app.post('/api/payment', async (req, res) => {
    const { cardNumber, cardHolder, expiryDate, cvv, paymentMethod } = req.body;

    // Here you can add real payment processing logic based on paymentMethod
    try {
        // Simulate payment processing logic based on method
        switch(paymentMethod) {
            case 'creditCard':
                // Handle credit card processing
                break;
            case 'googlePay':
                // Handle Google Pay processing
                break;
            case 'paytm':
                // Handle Paytm processing
                break;
            case 'phonePe':
                // Handle PhonePe processing
                break;
            default:
                return res.status(400).json({ success: false, message: 'Invalid payment method' });
        }

        const payment = new Payment({ cardNumber, cardHolder, expiryDate, cvv, paymentMethod });
        await payment.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
