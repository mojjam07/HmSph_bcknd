const bcrypt = require('bcrypt');
const { Admin } = require('../models/model1');

const defaultAdmin = {
  email: 'admin@example.com',
  password: 'Admin@123', // plaintext password to be hashed
  firstName: 'Default',
  lastName: 'Admin',
  role: 'admin',
  roleType: 'superadmin',
  permissions: {}
};

async function seedDefaultAdmin() {
  try {
    const existingAdmin = await Admin.findOne({ where: { email: defaultAdmin.email } });
    if (existingAdmin) {
      console.log('Default admin user already exists.');
      return;
    }

    const hashedPassword = await bcrypt.hash(defaultAdmin.password, 12);
    await Admin.create({
      email: defaultAdmin.email,
      password: hashedPassword,
      firstName: defaultAdmin.firstName,
      lastName: defaultAdmin.lastName,
      role: defaultAdmin.role,
      roleType: defaultAdmin.roleType,
      permissions: defaultAdmin.permissions
    });

    console.log('Default admin user created successfully.');
  } catch (error) {
    console.error('Error creating default admin user:', error);
  }
}

seedDefaultAdmin();
