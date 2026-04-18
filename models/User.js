const supabase = require('../config/supabase');

class User {
  /**
   * Create a new user in the database
   * @param {object} userData - User data { email, fullName, hashedPassword, phoneNumber }
   * @returns {Promise<object>} - Created user or error
   */
  static async create(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Find a user by email
   * @param {string} email - User email
   * @returns {Promise<object>} - User or null
   */
  static async findByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows found
      return data || null;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  /**
   * Find a user by ID
   * @param {string} id - User ID
   * @returns {Promise<object>} - User or null
   */
  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  /**
   * Update user information
   * @param {string} id - User ID
   * @param {object} updates - Fields to update
   * @returns {Promise<object>} - Updated user or error
   */
  static async update(id, updates) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Delete a user
   * @param {string} id - User ID
   * @returns {Promise<object>} - Success or error
   */
  static async delete(id) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = User;
