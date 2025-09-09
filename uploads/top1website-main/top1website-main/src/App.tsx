import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Components
import UXOptimizedHeader from './components/UXOptimizedHeader';
import AdvancedLoadingStates from './components/AdvancedLoadingStates';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import BookingPage from './pages/BookingPage';
import AIStylePage from './pages/AIStylePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import EnterpriseAdminPage from './pages/EnterpriseAdminPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { UserDashboardPage } from './pages/UserDashboardPage';

// Error Fallback Component
const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
      <details className="text-left mb-4">
        <summary className="cursor-pointer text-sm text-gray-500">Error details</summary>
        <pre className="text-xs text-red-600 mt-2 overflow-auto">{error.message}</pre>
      </details>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

// Loading Component
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <AdvancedLoadingStates.PageLoader />
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <div className="App min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
                <UXOptimizedHeader />
                <main>
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/booking" element={<BookingPage />} />
                      <Route path="/ai-style" element={<AIStylePage />} />
                      <Route path="/gallery" element={<GalleryPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/admin" element={<AdminPage />} />
                      <Route path="/enterprise-admin" element={<EnterpriseAdminPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/user-dashboard" element={<UserDashboardPage />} />
                    </Routes>
                  </Suspense>
                </main>
              </div>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;