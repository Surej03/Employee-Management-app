const condb = require('../config/mySqlDb');

const User = {
  // Check if a user exists by email
  userExists: async (email) => {
    const user = await condb('users').where({ email }).first();
    return user ? true : false;
  },
  getByUserId: async (userId) => {
    return await condb('employees').where({ user_id: userId }).select('*');
  },
  
  findByEmail: async (email) => {
    return await condb('users').select('*').where({ email }).first();
  },

  // Create a new user
  create: async (userData) => {
    return await condb('users').insert(userData);
  },

  // Update a user by ID
  update: async (id, updatedData) => {
    return await  condb('users').where({ id }).update(updatedData);
  },

  // Delete a user by ID
  delete: async (id) => {
    return await  condb('users').where({ id }).del();
  },

  // Get all users
  getAll: async () => {
    return await condb('users').select('*');
  },
};

module.exports = User;