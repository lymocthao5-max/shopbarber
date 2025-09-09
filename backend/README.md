# Vietnamese Barbershop Backend API

Backend API cho hệ thống quản lý tiệm cắt tóc Việt Nam được xây dựng với Node.js, Express, và SQL Server.

## Công nghệ sử dụng

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM cho SQL Server
- **SQL Server** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Winston** - Logging
- **Jest** - Testing

## Cấu trúc dự án

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # Cấu hình database
│   │   └── config.js            # Cấu hình Sequelize CLI
│   ├── models/
│   │   ├── index.js             # Model associations
│   │   ├── User.js              # User model
│   │   ├── Service.js           # Service model
│   │   ├── Barber.js            # Barber model
│   │   ├── Booking.js           # Booking model
│   │   ├── Review.js            # Review model
│   │   ├── WorkingHours.js      # Working hours model
│   │   ├── Promotion.js         # Promotion model
│   │   └── LoyaltyTransaction.js # Loyalty transaction model
│   ├── repositories/
│   │   ├── BaseRepository.js    # Base repository class
│   │   ├── UserRepository.js    # User repository
│   │   ├── BookingRepository.js # Booking repository
│   │   ├── ServiceRepository.js # Service repository
│   │   └── BarberRepository.js  # Barber repository
│   ├── services/
│   │   ├── AuthService.js       # Authentication service
│   │   ├── BookingService.js    # Booking business logic
│   │   ├── ServiceService.js    # Service business logic
│   │   └── BarberService.js     # Barber business logic
│   ├── controllers/
│   │   ├── AuthController.js    # Authentication controller
│   │   ├── BookingController.js # Booking controller
│   │   ├── ServiceController.js # Service controller
│   │   └── BarberController.js  # Barber controller
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   ├── validation.js        # Validation rules
│   │   ├── errorHandler.js      # Error handling middleware
│   │   └── rateLimiter.js       # Rate limiting middleware
│   ├── routes/
│   │   ├── index.js             # Main router
│   │   ├── auth.js              # Authentication routes
│   │   ├── bookings.js          # Booking routes
│   │   ├── services.js          # Service routes
│   │   └── barbers.js           # Barber routes
│   ├── utils/
│   │   ├── logger.js            # Winston logger
│   │   └── responseHelper.js    # Response helper functions
│   └── server.js                # Main server file
├── migrations/                  # Database migrations
├── seeders/                     # Database seeders
├── logs/                        # Log files
├── .env.example                 # Environment variables example
├── .sequelizerc                 # Sequelize CLI configuration
└── package.json
```

## Cài đặt

1. **Clone repository và cài đặt dependencies:**
```bash
cd backend
npm install
```

2. **Cấu hình environment variables:**
```bash
cp .env.example .env
# Chỉnh sửa file .env với thông tin database của bạn
```

3. **Chạy migrations và seeders:**
```bash
npm run db:migrate
npm run db:seed
```

4. **Khởi động server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký user mới
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/profile` - Lấy thông tin profile
- `PUT /api/auth/profile` - Cập nhật profile

### Services
- `GET /api/services` - Lấy danh sách dịch vụ
- `GET /api/services/:id` - Lấy chi tiết dịch vụ
- `POST /api/services` - Tạo dịch vụ mới (Admin)
- `PUT /api/services/:id` - Cập nhật dịch vụ (Admin)
- `DELETE /api/services/:id` - Xóa dịch vụ (Admin)

### Barbers
- `GET /api/barbers` - Lấy danh sách thợ cắt tóc
- `GET /api/barbers/:id` - Lấy chi tiết thợ cắt tóc
- `POST /api/barbers` - Tạo thợ cắt tóc mới (Admin)
- `PUT /api/barbers/:id` - Cập nhật thợ cắt tóc (Admin)
- `DELETE /api/barbers/:id` - Xóa thợ cắt tóc (Admin)

### Bookings
- `POST /api/bookings` - Tạo đặt lịch mới
- `GET /api/bookings` - Lấy danh sách đặt lịch (Admin)
- `GET /api/bookings/:id` - Lấy chi tiết đặt lịch
- `PUT /api/bookings/:id/status` - Cập nhật trạng thái đặt lịch (Admin)
- `GET /api/bookings/my-bookings` - Lấy đặt lịch của user hiện tại
- `GET /api/bookings/available-slots` - Lấy khung giờ trống

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `name` (String, Required)
- `email` (String, Unique, Required)
- `phone` (String, Optional)
- `password_hash` (String, Required)
- `role` (Enum: customer, admin, barber)
- `loyalty_points` (Integer, Default: 0)
- `avatar` (String, Optional)
- `is_active` (Boolean, Default: true)
- `last_login` (DateTime, Optional)

### Services Table
- `id` (UUID, Primary Key)
- `name` (String, Required)
- `description` (Text, Required)
- `price` (Decimal, Required)
- `duration` (Integer, Required)
- `category` (String, Required)
- `image` (String, Optional)
- `is_popular` (Boolean, Default: false)
- `is_active` (Boolean, Default: true)
- `features` (JSON, Optional)

### Barbers Table
- `id` (UUID, Primary Key)
- `name` (String, Required)
- `bio` (Text, Optional)
- `experience` (String, Required)
- `rating` (Decimal, Default: 5.0)
- `image` (String, Required)
- `specialties` (JSON, Optional)
- `is_available` (Boolean, Default: true)
- `phone` (String, Optional)
- `email` (String, Optional)

### Bookings Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to Users)
- `service_id` (UUID, Foreign Key to Services)
- `barber_id` (UUID, Foreign Key to Barbers)
- `customer_name` (String, Required)
- `customer_email` (String, Required)
- `customer_phone` (String, Required)
- `booking_date` (Date, Required)
- `booking_time` (Time, Required)
- `notes` (Text, Optional)
- `status` (Enum: pending, confirmed, completed, cancelled)
- `total_price` (Decimal, Required)
- `payment_status` (Enum: pending, paid, refunded)

## Tính năng

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Customer, Admin)
- Password hashing với bcrypt
- Token validation middleware

### Booking System
- Conflict detection cho time slots
- Automatic loyalty points calculation
- Status management workflow
- Available time slots calculation

### Security
- Helmet.js cho security headers
- CORS configuration
- Rate limiting
- Input validation với express-validator
- SQL injection protection với Sequelize

### Logging & Monitoring
- Winston logger với file rotation
- Request logging với Morgan
- Error tracking và reporting
- Health check endpoint

## Testing

```bash
# Chạy tests
npm test

# Chạy tests với coverage
npm run test:coverage
```

## Deployment

1. **Cấu hình production environment:**
```bash
NODE_ENV=production
DB_HOST=your-production-db-host
DB_PASSWORD=your-secure-password
JWT_SECRET=your-super-secure-jwt-secret
```

2. **Build và deploy:**
```bash
npm run build
npm start
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...},
  "timestamp": "2024-12-01T10:00:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [...],
  "timestamp": "2024-12-01T10:00:00.000Z"
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  },
  "timestamp": "2024-12-01T10:00:00.000Z"
}
```

## Môi trường phát triển

- Node.js >= 16.x
- SQL Server >= 2019
- npm >= 8.x

## License

MIT License