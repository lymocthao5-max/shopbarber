'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create demo users
    const users = [
      {
        id: uuidv4(),
        name: 'Admin User',
        email: 'admin@barbershop.com',
        phone: '0901234567',
        password_hash: await bcrypt.hash('admin123', 12),
        role: 'admin',
        loyalty_points: 0,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Nguyễn Văn An',
        email: 'customer@example.com',
        phone: '0912345678',
        password_hash: await bcrypt.hash('customer123', 12),
        role: 'customer',
        loyalty_points: 150,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('users', users);

    // Create demo services
    const services = [
      {
        id: uuidv4(),
        name: 'Cắt Tóc Classic',
        description: 'Kiểu cắt tóc truyền thống với kỹ thuật chuyên nghiệp',
        price: 450000,
        duration: 30,
        category: 'Cắt tóc',
        is_popular: false,
        is_active: true,
        features: JSON.stringify(['Tư vấn kiểu tóc', 'Cắt tóc chuyên nghiệp', 'Gội đầu massage', 'Tạo kiểu cơ bản']),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Premium Styling',
        description: 'Tạo kiểu cao cấp với sản phẩm nhập khẩu',
        price: 850000,
        duration: 60,
        category: 'Tạo kiểu',
        is_popular: true,
        is_active: true,
        features: JSON.stringify(['AI tư vấn kiểu tóc', 'Cắt tóc cao cấp', 'Gội đầu thảo dược', 'Tạo kiểu chuyên nghiệp', 'Chăm sóc da đầu']),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Gentleman Package',
        description: 'Gói dịch vụ toàn diện cho quý ông',
        price: 1500000,
        duration: 90,
        category: 'Gói combo',
        is_popular: false,
        is_active: true,
        features: JSON.stringify(['Cắt tóc + tạo kiểu', 'Chăm sóc da mặt', 'Massage thư giãn', 'Cạo râu chuyên nghiệp', 'Đồ uống miễn phí']),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('services', services);

    // Create demo barbers
    const barbers = [
      {
        id: uuidv4(),
        name: 'Nguyễn Minh Tuấn',
        bio: 'Chuyên gia cắt tóc với 8 năm kinh nghiệm',
        experience: '8 năm kinh nghiệm',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        specialties: JSON.stringify(['Cắt tóc hiện đại', 'Fade cuts', 'Styling']),
        is_available: true,
        phone: '0901111111',
        email: 'tuan@barbershop.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Trần Thị Lan',
        bio: 'Chuyên gia kiểu tóc cổ điển và hiện đại',
        experience: '6 năm kinh nghiệm',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
        specialties: JSON.stringify(['Kiểu tóc cổ điển', 'Tạo kiểu nữ', 'Color']),
        is_available: true,
        phone: '0902222222',
        email: 'lan@barbershop.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Lê Văn Hùng',
        bio: 'Chuyên gia chăm sóc râu và tạo hình râu',
        experience: '10 năm kinh nghiệm',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
        specialties: JSON.stringify(['Cạo râu', 'Tạo hình râu', 'Chăm sóc da mặt']),
        is_available: true,
        phone: '0903333333',
        email: 'hung@barbershop.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('barbers', barbers);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('barbers', null, {});
    await queryInterface.bulkDelete('services', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};