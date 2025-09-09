const { v4: uuidv4 } = require('uuid');
const database = require('../config/database');

class Barber {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.name = data.name;
    this.bio = data.bio;
    this.experience = data.experience;
    this.rating = data.rating || 5.0;
    this.image = data.image;
    this.specialties = typeof data.specialties === 'string' 
      ? JSON.parse(data.specialties) 
      : data.specialties || [];
    this.available = data.available !== undefined ? data.available : true;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create(barberData) {
    const barber = new Barber(barberData);

    const sql = `
      INSERT INTO barbers (id, name, bio, experience, rating, image, specialties, available)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await database.run(sql, [
      barber.id,
      barber.name,
      barber.bio,
      barber.experience,
      barber.rating,
      barber.image,
      JSON.stringify(barber.specialties),
      barber.available
    ]);

    return barber;
  }

  static async findAll(availableOnly = false) {
    const sql = availableOnly 
      ? 'SELECT * FROM barbers WHERE available = TRUE ORDER BY rating DESC, name ASC'
      : 'SELECT * FROM barbers ORDER BY created_at DESC';
    const rows = await database.all(sql);
    return rows.map(row => new Barber(row));
  }

  static async findById(id) {
    const sql = 'SELECT * FROM barbers WHERE id = ?';
    const row = await database.get(sql, [id]);
    return row ? new Barber(row) : null;
  }

  static async findAvailableForDateTime(date, time) {
    // Check which barbers are available for specific date/time
    const sql = `
      SELECT b.* FROM barbers b
      WHERE b.available = TRUE
      AND b.id NOT IN (
        SELECT barber_id FROM bookings 
        WHERE booking_date = ? AND booking_time = ? 
        AND status IN ('confirmed', 'pending')
      )
      ORDER BY b.rating DESC
    `;
    const rows = await database.all(sql, [date, time]);
    return rows.map(row => new Barber(row));
  }

  async update(updateData) {
    const allowedFields = ['name', 'bio', 'experience', 'rating', 'image', 'specialties', 'available'];
    const updates = [];
    const values = [];

    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key) && value !== undefined) {
        if (key === 'specialties') {
          updates.push(`${key} = ?`);
          values.push(JSON.stringify(value));
        } else {
          updates.push(`${key} = ?`);
          values.push(value);
        }
      }
    }

    if (updates.length === 0) return this;

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(this.id);

    const sql = `UPDATE barbers SET ${updates.join(', ')} WHERE id = ?`;
    await database.run(sql, values);

    return Barber.findById(this.id);
  }

  async getBookingStats() {
    const sql = `
      SELECT 
        COUNT(*) as total_bookings,
        AVG(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completion_rate,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_bookings
      FROM bookings 
      WHERE barber_id = ?
    `;
    return await database.get(sql, [this.id]);
  }
}

module.exports = Barber;