const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const resetPassword = async () => {
  try {
    const username = process.argv[2];
    const newPassword = process.argv[3];

    if (!username || !newPassword) {
      console.error('Usage: node reset-password.js <username> <newPassword>');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const result = await User.updateOne({ username }, { $set: { password: hashedPassword } });

    if (result.nModified === 0) {
      console.log(`User with username "${username}" not found.`);
    } else {
      console.log(`Password for user "${username}" has been reset successfully.`);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error resetting password:', error);
    process.exit(1);
  }
};

resetPassword();
