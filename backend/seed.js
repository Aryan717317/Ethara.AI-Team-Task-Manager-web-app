require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const adminExists = await User.findOne({ email: 'admin@taskify.com' });
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: 'admin@taskify.com',
        password: 'password123',
        role: 'ADMIN',
      });
      console.log('Admin user created: admin@taskify.com / password123');
    } else {
      console.log('Admin user already exists');
    }

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedDB();
