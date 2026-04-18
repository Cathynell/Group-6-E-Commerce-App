const User = require('../models/User');
const { hashPassword, comparePassword, generateToken } = require('../utils/authUtils');
const { validateData, signupSchema, loginSchema } = require('../utils/validation');

/**
 * User signup controller
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const signup = async (req, res) => {
  try {
    // Validate input
    const { value, error } = validateData(req.body, signupSchema);

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    const { fullName, email, password, phoneNumber } = value;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered. Please login or use a different email.',
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await User.create({
      full_name: fullName,
      email: email.toLowerCase(),
      password_hash: hashedPassword,
      phone_number: phoneNumber || null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create user',
        error: result.error,
      });
    }

    // Generate JWT token
    const token = generateToken(
      {
        id: result.data.id,
        email: result.data.email,
        fullName: result.data.full_name,
      },
      '7d'
    );

    // Return success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: result.data.id,
        fullName: result.data.full_name,
        email: result.data.email,
        phoneNumber: result.data.phone_number,
        token,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during signup',
      error: error.message,
    });
  }
};

/**
 * User login controller
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const login = async (req, res) => {
  try {
    // Validate input
    const { value, error } = validateData(req.body, loginSchema);

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    const { email, password } = value;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = generateToken(
      {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
      },
      '7d'
    );

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phoneNumber: user.phone_number,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
