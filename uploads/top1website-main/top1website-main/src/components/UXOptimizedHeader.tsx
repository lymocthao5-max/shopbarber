import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { 
  Menu, 
  X, 
  Scissors, 
  Calendar, 
  Phone, 
  MapPin,
  User, 
  LogOut, 
  Settings
} from 'lucide-react';

const UXOptimizedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    // First navigate to home page if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleBookingClick = () => {
    if (user) {
      if (user.role === 'customer') {
        navigate('/booking');
      } else {
        navigate('/admin');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-purple-500/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Scissors className="w-8 h-8 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg group-hover:bg-cyan-400/20 transition-colors duration-300"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Vietnamese Barbershop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
            >
              Trang Chủ
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
            >
              Giới Thiệu
            </button>
            <Link
              to="/services"
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
            >
              Dịch Vụ
            </Link>
            <Link
              to="/gallery"
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
            >
              Thư Viện
            </Link>
            <Link
              to="/ai-style"
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
            >
              AI Style
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
            >
              Liên Hệ
            </Link>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Phone className="w-4 h-4" />
              <span>0901 234 567</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>123 Nguyễn Huệ, Q1, TP.HCM</span>
            </div>
            
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-md rounded-lg shadow-lg border border-purple-500/20 py-1">
                      <div className="px-4 py-2 border-b border-purple-500/20">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                      
                      {user.role === 'customer' ? (
                        <>
                          <Link
                            to="/user-dashboard"
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-purple-400 hover:bg-purple-500/10"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <User className="h-4 w-4 mr-2" />
                            Dashboard
                          </Link>
                          <Link
                            to="/booking"
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-purple-400 hover:bg-purple-500/10"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Đặt lịch
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-purple-400 hover:bg-purple-500/10"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Admin Dashboard
                          </Link>
                          <Link
                            to="/enterprise-admin"
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-purple-400 hover:bg-purple-500/10"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Enterprise Admin
                          </Link>
                        </>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleBookingClick}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {user.role === 'customer' ? 'Đặt Lịch' : 'Quản Lý'}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                    Đăng ký
                  </Button>
                </Link>
                <Button 
                  onClick={handleBookingClick}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Đặt Lịch Ngay
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-purple-400 transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-purple-500/20">
            <nav className="px-4 py-6 space-y-4">
              <Link
                to="/"
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang Chủ
              </Link>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium py-2"
              >
                Giới Thiệu
              </button>
              <Link
                to="/services"
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dịch Vụ
              </Link>
              <Link
                to="/gallery"
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Thư Viện
              </Link>
              <Link
                to="/ai-style"
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Style
              </Link>
              <Link
                to="/contact"
                className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Liên Hệ
              </Link>
              
              {user ? (
                <div className="pt-4 border-t border-gray-700 space-y-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.role === 'customer' ? 'Khách hàng' : 'Quản trị viên'}</p>
                    </div>
                  </div>
                  
                  {user.role === 'customer' ? (
                    <>
                      <Link
                        to="/user-dashboard"
                        className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/booking"
                        className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Đặt lịch
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/admin"
                        className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                      <Link
                        to="/enterprise-admin"
                        className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Enterprise Admin
                      </Link>
                    </>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-400 hover:text-red-300 transition-colors duration-300 font-medium py-2"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-700 space-y-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                    >
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                      Đăng ký
                    </Button>
                  </Link>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>0901 234 567</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>123 Nguyễn Huệ, Q1, TP.HCM</span>
                </div>
                <Button 
                  onClick={handleBookingClick}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium py-2 rounded-full transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {user ? (user.role === 'customer' ? 'Đặt Lịch' : 'Quản Lý') : 'Đặt Lịch Ngay'}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default UXOptimizedHeader;