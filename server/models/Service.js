const { v4: uuidv4 } = require('uuid');
const database = require('../config/database');

class Service {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.duration = data.duration;
    this.category = data.category;
    this.image = data.image;
    this.popular = data.popular || false;
    this.active = data.active !== undefined ? data.active : true;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create(serviceData) {
    const service = new Service(serviceData);

    const sql = `
      INSERT INTO services (id, name, description, price, duration, category, image, popular, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await database.run(sql, [
      service.id,
      service.name,
      service.description,
      service.price,
      service.duration,
      service.category,
      service.image,
      service.popular,
      service.active
    ]);

    return service;
  }

  static async findAll(activeOnly = true) {
    const sql = activeOnly 
      ? 'SELECT * FROM services WHERE active = TRUE ORDER BY popular DESC, name ASC'
      : 'SELECT * FROM services ORDER BY created_at DESC';
    const rows = await database.all(sql);
    return rows.map(row => new Service(row));
  }

  static async findById(id) {
    const sql = 'SELECT * FROM services WHERE id = ?';
    const row = await database.get(sql, [id]);
    return row ? new Service(row) : null;
  }

  static async findByCategory(category) {
    const sql = 'SELECT * FROM services WHERE category = ? AND active = TRUE ORDER BY name ASC';
    const rows = await database.all(sql, [category]);
    return rows.map(row => new Service(row));
  }

  async update(updateData) {
    const allowedFields = ['name', 'description', 'price', 'duration', 'category', 'image', 'popular', 'active'];
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

    const sql = `UPDATE services SET ${updates.join(', ')} WHERE id = ?`;
    await database.run(sql, values);

    return Service.findById(this.id);
  }

  async delete() {
    // Soft delete
    const sql = 'UPDATE services SET active = FALSE, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    await database.run(sql, [this.id]);
  }
}

module.exports = Service;