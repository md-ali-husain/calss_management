const User = require('../models/User');

const createInitialPrincipal = async () => {
  try {
    const principalExists = await User.findOne({ email: 'principal@classroom.com' });

    if (!principalExists) {
      const principal = await User.create({
        name: 'Principal',
        email: 'principal@classroom.com',
        password: 'Admin',
        role: 'Principal',
      });

      console.log('Initial Principal account created:', principal);
    } else {
      console.log('Principal account already exists.');
    }
  } catch (error) {
    console.error('Error creating principal account:', error);
  }
};

module.exports = createInitialPrincipal;
