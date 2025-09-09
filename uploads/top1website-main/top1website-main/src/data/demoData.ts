export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  loyaltyPoints?: number;
}

export const demoUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@barbershop.com',
    phone: '0901234567',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Nguyễn Văn An',
    email: 'customer@example.com',
    phone: '0912345678',
    role: 'customer',
    loyaltyPoints: 150,
  },
  {
    id: '3',
    name: 'Trần Thị Lan',
    email: 'lan.tran@email.com',
    phone: '0923456789',
    role: 'customer',
    loyaltyPoints: 75,
  },
];