const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create default admin user
    const defaultAdmin = {
      username: 'abiggj',
      email: 'aniket.jhariya@gmail.com',
      password: 'planner07',
      role: 'admin'
    };

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(defaultAdmin.password, saltRounds);

    // Create admin user
    const adminUser = new User({
      username: defaultAdmin.username,
      email: defaultAdmin.email,
      password: hashedPassword,
      role: defaultAdmin.role
    });

    await adminUser.save();

    console.log('✅ Admin user created successfully');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
};

module.exports = {
  createAdminUser
};
