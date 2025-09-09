import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Clock, User, Scissors, Star, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { servicesData, barbersData } from '../data/servicesData';

// Types
interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
  price: number;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category?: string;
  image?: string;
  popular?: boolean;
}

interface Barber {
  id: string;
  name: string;
  specialty: string;
  specialties?: string[];
  experience: string;
  rating: number;
  image: string;
  bio?: string;
  available?: boolean;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit: string;
  preferences: string[];
  notes?: string;
}

const AdminTabs: React.FC = () => {
  // State management using centralized data
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  
  // Form states
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [isAddingBarber, setIsAddingBarber] = useState(false);

  // Initialize data from centralized source
  useEffect(() => {
    // Load services from centralized data
        const initialServices: Service[] = servicesData.map(service => ({
          id: service.id || `service-${Date.now()}-${Math.random()}`,
          name: service.name,
          description: service.description,
          price: service.price,
          duration: service.duration,
          category: service.category || '',
          image: service.image,
          popular: service.popular || false
        }));
    setServices(initialServices);

    // Load barbers from centralized data
        const initialBarbers: Barber[] = barbersData.map(barber => ({
          id: barber.id || `barber-${Date.now()}-${Math.random()}`,
          name: barber.name,
          specialty: barber.specialty,
          specialties: [],
          experience: barber.experience,
          rating: barber.rating,
          image: barber.image,
          bio: '',
          available: true
        }));
    setBarbers(initialBarbers);

    // Load bookings from localStorage (keeping existing bookings)
    const savedBookings = localStorage.getItem('barbershop_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }

    // Load customers from localStorage (keeping existing customers)
    const savedCustomers = localStorage.getItem('barbershop_customers');
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
  }, []);

  // Save to localStorage when data changes (for bookings and customers)
  useEffect(() => {
    localStorage.setItem('barbershop_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('barbershop_customers', JSON.stringify(customers));
  }, [customers]);

  // Service management functions
  const handleAddService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: `service-${Date.now()}-${Math.random()}`
    };
    setServices(prev => [...prev, newService]);
    setIsAddingService(false);
  };

  const handleUpdateService = (updatedService: Service) => {
    setServices(prev => prev.map(service => 
      service.id === updatedService.id ? updatedService : service
    ));
    setEditingService(null);
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
  };

  // Barber management functions
  const handleAddBarber = (barberData: Omit<Barber, 'id'>) => {
    const newBarber: Barber = {
      ...barberData,
      id: `barber-${Date.now()}-${Math.random()}`
    };
    setBarbers(prev => [...prev, newBarber]);
    setIsAddingBarber(false);
  };

  const handleUpdateBarber = (updatedBarber: Barber) => {
    setBarbers(prev => prev.map(barber => 
      barber.id === updatedBarber.id ? updatedBarber : barber
    ));
    setEditingBarber(null);
  };

  const handleDeleteBarber = (barberId: string) => {
    setBarbers(prev => prev.filter(barber => barber.id !== barberId));
  };

  // Booking management functions
  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    ));
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId));
  };

  // Statistics
  const totalRevenue = bookings
    .filter(booking => booking.status === 'completed')
    .reduce((sum, booking) => sum + booking.price, 0);

  const todayBookings = bookings.filter(booking => {
    const today = new Date().toISOString().split('T')[0];
    return booking.date === today;
  });

  const pendingBookings = bookings.filter(booking => booking.status === 'pending');

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString('vi-VN')}₫</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lịch hẹn hôm nay</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayBookings.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ xác nhận</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBookings.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng khách hàng</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bookings">Lịch hẹn</TabsTrigger>
          <TabsTrigger value="services">Dịch vụ</TabsTrigger>
          <TabsTrigger value="barbers">Thợ cắt tóc</TabsTrigger>
          <TabsTrigger value="customers">Khách hàng</TabsTrigger>
        </TabsList>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý lịch hẹn</CardTitle>
              <CardDescription>Xem và quản lý tất cả lịch hẹn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{booking.customerName}</h3>
                        <Badge variant={
                          booking.status === 'confirmed' ? 'default' :
                          booking.status === 'completed' ? 'secondary' :
                          booking.status === 'pending' ? 'outline' : 'destructive'
                        }>
                          {booking.status === 'confirmed' ? 'Đã xác nhận' :
                           booking.status === 'completed' ? 'Hoàn thành' :
                           booking.status === 'pending' ? 'Chờ xác nhận' : 'Đã hủy'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Dịch vụ: {booking.service}</p>
                        <p>Thợ cắt: {booking.barber}</p>
                        <p>Ngày: {booking.date} - {booking.time}</p>
                        <p>Giá: {booking.price.toLocaleString('vi-VN')}₫</p>
                        <p>SĐT: {booking.phone}</p>
                        {booking.notes && <p>Ghi chú: {booking.notes}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {booking.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                        >
                          Xác nhận
                        </Button>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                        >
                          Hoàn thành
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteBooking(booking.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {bookings.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Chưa có lịch hẹn nào
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Quản lý dịch vụ</CardTitle>
                <CardDescription>Quản lý các dịch vụ của tiệm (đồng bộ với dữ liệu tập trung)</CardDescription>
              </div>
              <Button onClick={() => setIsAddingService(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm dịch vụ
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{service.name}</h3>
                        {service.popular && <Badge>Phổ biến</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                      <div className="flex gap-4 text-sm">
                        <span>Giá: {service.price.toLocaleString('vi-VN')}₫</span>
                        <span>Thời gian: {service.duration} phút</span>
                        <span>Danh mục: {service.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingService(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Barbers Tab */}
        <TabsContent value="barbers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Quản lý thợ cắt tóc</CardTitle>
                <CardDescription>Quản lý đội ngũ thợ cắt tóc (đồng bộ với dữ liệu tập trung)</CardDescription>
              </div>
              <Button onClick={() => setIsAddingBarber(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm thợ cắt
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {barbers.map((barber) => (
                  <div key={barber.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={barber.image}
                        alt={barber.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{barber.name}</h3>
                          <Badge variant={barber.available ? 'default' : 'secondary'}>
                            {barber.available ? 'Có sẵn' : 'Bận'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{barber.bio}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span>Kinh nghiệm: {barber.experience}</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {barber.rating}
                          </span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {barber.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingBarber(barber)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteBarber(barber.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý khách hàng</CardTitle>
              <CardDescription>Thông tin khách hàng và lịch sử</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{customer.name}</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>SĐT: {customer.phone}</p>
                        <p>Email: {customer.email}</p>
                        <p>Tổng lượt đến: {customer.totalVisits}</p>
                        <p>Tổng chi tiêu: {customer.totalSpent.toLocaleString('vi-VN')}₫</p>
                        <p>Lần cuối: {customer.lastVisit}</p>
                        {customer.notes && <p>Ghi chú: {customer.notes}</p>}
                      </div>
                      {customer.preferences.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {customer.preferences.map((pref, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {customers.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Chưa có khách hàng nào
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Service Dialog */}
      <ServiceDialog
        service={editingService}
        isOpen={!!editingService || isAddingService}
        onClose={() => {
          setEditingService(null);
          setIsAddingService(false);
        }}
        onSave={editingService ? handleUpdateService : handleAddService}
      />

      {/* Add/Edit Barber Dialog */}
      <BarberDialog
        barber={editingBarber}
        isOpen={!!editingBarber || isAddingBarber}
        onClose={() => {
          setEditingBarber(null);
          setIsAddingBarber(false);
        }}
        onSave={editingBarber ? handleUpdateBarber : handleAddBarber}
      />
    </div>
  );
};

// Service Dialog Component
const ServiceDialog: React.FC<{
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Service | Omit<Service, 'id'>) => void;
}> = ({ service, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    duration: 30,
    category: '',
    image: '',
    popular: false
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        category: service.category,
        image: service.image || '',
        popular: service.popular || false
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        duration: 30,
        category: '',
        image: '',
        popular: false
      });
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (service) {
      onSave({ ...service, ...formData });
    } else {
      onSave(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{service ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên dịch vụ</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Giá (₫)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Thời gian (phút)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Danh mục</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">URL hình ảnh</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="popular"
              checked={formData.popular}
              onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
            />
            <Label htmlFor="popular">Dịch vụ phổ biến</Label>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Lưu
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Barber Dialog Component
const BarberDialog: React.FC<{
  barber: Barber | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (barber: Barber | Omit<Barber, 'id'>) => void;
}> = ({ barber, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialties: [] as string[],
    experience: '',
    rating: 5,
    image: '',
    bio: '',
    available: true
  });

  useEffect(() => {
    if (barber) {
      setFormData({
        name: barber.name,
        specialties: barber.specialties,
        experience: barber.experience,
        rating: barber.rating,
        image: barber.image,
        bio: barber.bio,
        available: barber.available
      });
    } else {
      setFormData({
        name: '',
        specialties: [],
        experience: '',
        rating: 5,
        image: '',
        bio: '',
        available: true
      });
    }
  }, [barber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (barber) {
      onSave({ ...barber, ...formData });
    } else {
      onSave(formData);
    }
  };

  const handleSpecialtyAdd = (specialty: string) => {
    if (specialty && !formData.specialties.includes(specialty)) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialty]
      });
    }
  };

  const handleSpecialtyRemove = (index: number) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((_, i) => i !== index)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{barber ? 'Chỉnh sửa thợ cắt tóc' : 'Thêm thợ cắt tóc mới'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Giới thiệu</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Kinh nghiệm</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Đánh giá</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">URL hình ảnh</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Chuyên môn</Label>
            <div className="flex gap-1 flex-wrap mb-2">
              {formData.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {specialty}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handleSpecialtyRemove(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Thêm chuyên môn"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSpecialtyAdd(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="available"
              checked={formData.available}
              onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
            />
            <Label htmlFor="available">Có sẵn</Label>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Lưu
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminTabs;