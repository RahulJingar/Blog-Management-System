const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  const existing = await User.findOne({ email: 'admin@blog.com' });
  if (existing) {
    console.log('Superadmin already exists');
    process.exit();
  }

  await User.create({
    name: 'Super Admin',
    email: 'admin@blog.com',
    password: 'admin123',
    role: 'superadmin',
    status: 'active'
  });

  console.log('Superadmin created: admin@blog.com / admin123');
  process.exit();
};

seed().catch(err => { console.error(err); process.exit(1); });
