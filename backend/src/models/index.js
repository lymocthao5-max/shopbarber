const sequelize = require('../config/database');
const User = require('./User');
const Service = require('./Service');
const Barber = require('./Barber');
const Booking = require('./Booking');
const Review = require('./Review');
const WorkingHours = require('./WorkingHours');
const Promotion = require('./Promotion');
const LoyaltyTransaction = require('./LoyaltyTransaction');

// Define associations
User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Service.hasMany(Booking, { foreignKey: 'serviceId', as: 'bookings' });
Booking.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

Barber.hasMany(Booking, { foreignKey: 'barberId', as: 'bookings' });
Booking.belongsTo(Barber, { foreignKey: 'barberId', as: 'barber' });

Barber.hasMany(WorkingHours, { foreignKey: 'barberId', as: 'workingHours' });
WorkingHours.belongsTo(Barber, { foreignKey: 'barberId', as: 'barber' });

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Barber.hasMany(Review, { foreignKey: 'barberId', as: 'reviews' });
Review.belongsTo(Barber, { foreignKey: 'barberId', as: 'barber' });

Service.hasMany(Review, { foreignKey: 'serviceId', as: 'reviews' });
Review.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

Booking.hasOne(Review, { foreignKey: 'bookingId', as: 'review' });
Review.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });

User.hasMany(LoyaltyTransaction, { foreignKey: 'userId', as: 'loyaltyTransactions' });
LoyaltyTransaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  Service,
  Barber,
  Booking,
  Review,
  WorkingHours,
  Promotion,
  LoyaltyTransaction
};