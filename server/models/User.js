const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const database = require('../config/database');

class User {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.password_hash = data.password_hash;
    this.role = data.role || 'customer';
    this.loyalty_points = data.loyalty_points || 0;
    this.avatar = data.avatar;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create(userData) {
    const { name, email, phone, password, role = 'customer' } = userData;
    
    // Hash password
    const password_hash = await bcrypt.hash(password, 12);
    
    const user = new User({
      name,
      email,
      phone,
      password_hash,
      role
    });

    const sql = `
      INSERT INTO users (id, name, email, phone, password_hash, role, loyalty_points)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    await database.run(sql, [
      user.id,
      user.name,
      user.email,
      user.phone,
      user.password_hash,
      user.role,
      user.loyalty_points
    ]);

    return user;
  }

  static async findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const row = await database.get(sql, [email]);
    return row ? new User(row) : null;
  }

  static async findById(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const row = await database.get(sql, [id]);
    return row ? new User(row) : null;
  }

  static async findAll() {
    const sql = 'SELECT * FROM users ORDER BY created_at DESC';
    const rows = await database.all(sql);
    return rows.map(row => new User(row));
  }

  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password_hash);
  }

  async update(updateData) {
    const allowedFields = ['name', 'phone', 'avatar', 'loyalty_points'];
    const updates = [];
    const values = [];

    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key) && value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (updates.length === 0) return this;

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(this.id);

    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    await database.run(sql, values);

    return User.findById(this.id);
  }

  toJSON() {
    const { password_hash, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;