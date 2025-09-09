const { v4: uuidv4 } = require('uuid');
const database = require('../config/database');

class Booking {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.user_id = data.user_id;
    this.service_id = data.service_id;
    this.barber_id = data.barber_id;
    this.customer_name = data.customer_name;
    this.customer_email = data.customer_email;
    this.customer_phone = data.customer_phone;
    this.booking_date = data.booking_date;
    this.booking_time = data.booking_time;
    this.notes = data.notes;
    this.status = data.status || 'pending';
    this.total_price = data.total_price;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async create(bookingData) {
    // Validate required fields based on frontend form
    const requiredFields = [
      'service_id', 'barber_id', 'customer_name', 
      'customer_email', 'customer_phone', 'booking_date', 
      'booking_time', 'total_price'
    ];

    for (const field of requiredFields) {
      if (!bookingData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Check for conflicts
    const conflict = await Booking.findConflict(
      bookingData.booking_date,
      bookingData.booking_time,
      bookingData.barber_id
    );

    if (conflict) {
      throw new Error('Time slot already booked');
    }

    const booking = new Booking(bookingData);

    const sql = `
      INSERT INTO bookings (
        id, user_id, service_id, barber_id, customer_name, 
        customer_email, customer_phone, booking_date, booking_time, 
        notes, status, total_price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await database.run(sql, [
      booking.id,
      booking.user_id,
      booking.service_id,
      booking.barber_id,
      booking.customer_name,
      booking.customer_email,
      booking.customer_phone,
      booking.booking_date,
      booking.booking_time,
      booking.notes,
      booking.status,
      booking.total_price
    ]);

    return booking;
  }

  static async findConflict(date, time, barberId) {
    const sql = `
      SELECT * FROM bookings 
      WHERE booking_date = ? AND booking_time = ? AND barber_id = ? 
      AND status IN ('pending', 'confirmed')
    `;
    return await database.get(sql, [date, time, barberId]);
  }

  static async findAll() {
    const sql = `
      SELECT 
        b.*,
        s.name as service_name,
        s.price as service_price,
        s.duration as service_duration,
        br.name as barber_name,
        u.name as user_name
      FROM bookings b
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN barbers br ON b.barber_id = br.id
      LEFT JOIN users u ON b.user_id = u.id
      ORDER BY b.booking_date DESC, b.booking_time DESC
    `;
    const rows = await database.all(sql);
    return rows.map(row => new Booking(row));
  }

  static async findById(id) {
    const sql = `
      SELECT 
        b.*,
        s.name as service_name,
        s.price as service_price,
        s.duration as service_duration,
        br.name as barber_name,
        u.name as user_name
      FROM bookings b
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN barbers br ON b.barber_id = br.id
      LEFT JOIN users u ON b.user_id = u.id
      WHERE b.id = ?
    `;
    const row = await database.get(sql, [id]);
    return row ? new Booking(row) : null;
  }

  static async findByUserId(userId) {
    const sql = `
      SELECT 
        b.*,
        s.name as service_name,
        s.price as service_price,
        br.name as barber_name
      FROM bookings b
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN barbers br ON b.barber_id = br.id
      WHERE b.user_id = ?
      ORDER BY b.booking_date DESC, b.booking_time DESC
    `;
    const rows = await database.all(sql, [userId]);
    return rows.map(row => new Booking(row));
  }

  static async findByDateRange(startDate, endDate) {
    const sql = `
      SELECT 
        b.*,
        s.name as service_name,
        br.name as barber_name,
        u.name as user_name
      FROM bookings b
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN barbers br ON b.barber_id = br.id
      LEFT JOIN users u ON b.user_id = u.id
      WHERE b.booking_date BETWEEN ? AND ?
      ORDER BY b.booking_date ASC, b.booking_time ASC
    `;
    const rows = await database.all(sql, [startDate, endDate]);
    return rows.map(row => new Booking(row));
  }

  static async getAvailableTimeSlots(date, barberId) {
    const allSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
      '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
    ];

    const sql = `
      SELECT booking_time FROM bookings 
      WHERE booking_date = ? AND barber_id = ? 
      AND status IN ('pending', 'confirmed')
    `;
    
    const bookedSlots = await database.all(sql, [date, barberId]);
    const bookedTimes = bookedSlots.map(slot => slot.booking_time);
    
    return allSlots.filter(slot => !bookedTimes.includes(slot));
  }

  async updateStatus(status) {
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const sql = 'UPDATE bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    await database.run(sql, [status, this.id]);
    
    this.status = status;
    return this;
  }

  async update(updateData) {
    const allowedFields = ['customer_name', 'customer_email', 'customer_phone', 'notes', 'status'];
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

    const sql = `UPDATE bookings SET ${updates.join(', ')} WHERE id = ?`;
    await database.run(sql, values);

    return Booking.findById(this.id);
  }

  async delete() {
    const sql = 'DELETE FROM bookings WHERE id = ?';
    await database.run(sql, [this.id]);
  }
}

module.exports = Booking;