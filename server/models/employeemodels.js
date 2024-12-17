const condb = require('../config/mySqlDb');

const User = {
  // Find a user by email
  findByEmail: async (email) => {
    return await condb('employees').where({ email }).first();
  },

  // Create a new user
  create: async (userData) => {
    return await condb('employees').insert(userData);
  },
  getByUserId: async (userId) => {
    return await condb('employees').where({ user_id: userId}).select('id', 'empname', 'age', 'city');
  },
  // Update a user by ID
  update: async (id, updatedData) => {
    return await condb('employees').where({ id }).update(updatedData);
  },

  // Delete a user by ID
  delete: async (id) => {
    return await condb('employees').where({ id }).del();
  },

  // Get all employees
  getAll: async () => {
    return await condb('employees').select('*');
  },
};

module.exports = User;