import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MedicalPortal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define User schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  gender: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // Add a field to track email verification
  verificationKey: { type: String } // Add a field to store the verification key
});
const User = mongoose.model('User', userSchema);

// Generate a random verification key
const generateVerificationKey = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // Generates a 6-character alphanumeric key
};

// Send verification email
const sendVerificationEmail = async (email, verificationKey) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "maddison53@ethereal.email", // Your Ethereal email address
      pass: "jn7jnAPss4f63QBp6D", // Your Ethereal email password
    },
  });

  const mailOptions = {
    from: '"Austin Prince Roosewelt 👻" <austinprinceroosewelt.25cs@licet.ac.in>', // sender address
    to: email, // list of receivers
    subject: "Email Verification ✔", // Subject line
    text: `Your verification code is: ${verificationKey}`, // plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent: %s", info.messageId);
    // Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// Register a new user
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, email, phone, gender } = req.body;
    const verificationKey = generateVerificationKey(); // Generate verification key
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email, phone, gender, verificationKey });
    await newUser.save();
    // Send verification email
    await sendVerificationEmail(email, verificationKey);
    res.status(201).json({ message: 'User registered successfully. Verification email sent.' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'User registration failed' });
  }
});

// Verify email with verification key
app.post('/api/verifyEmail', async (req, res) => {
  try {
    const { email, verificationKey } = req.body;
    const user = await User.findOne({ email, verificationKey });
    if (!user) {
      return res.status(400).json({ error: 'Invalid verification key' });
    }
    // Update user's verification status
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: 'Email verification successful' });
  } catch (err) {
    console.error('Error verifying email:', err);
    res.status(500).json({ error: 'Email verification failed' });
  }
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
