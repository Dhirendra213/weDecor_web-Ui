import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Loader from './components/common/Loader';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import GalleryPage from './pages/public/GalleryPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import ProfilePage from './pages/public/ProfilePage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import UploadMediaPage from './pages/admin/UploadMediaPage';
import ManageGalleryPage from './pages/admin/ManageGalleryPage';
import MessagesPage from './pages/admin/MessagesPage';

// Public layout wrapper (Navbar + Footer)
const PublicLayout = () => (
  <>
    <Navbar />
    <main className="min-h-screen">
      <Outlet />
    </main>
    <Footer />
  </>
);

// Auth-only layout (no Navbar/Footer for login/register)
const AuthLayout = () => <Outlet />;

// Protected route for authenticated users
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <Loader fullScreen />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;

  return children;
};

// Guest-only route (redirect if already logged in)
const GuestRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <Loader fullScreen />;

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? '/admin/dashboard' : '/'} replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Pages with Navbar + Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* Auth Pages (no Navbar/Footer) */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
      </Route>

      {/* Admin Routes (Admin Layout, protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="upload" element={<UploadMediaPage />} />
        <Route path="gallery" element={<ManageGalleryPage />} />
        <Route path="messages" element={<MessagesPage />} />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-ivory">
            <div className="text-center">
              <span className="text-6xl block mb-4">🌸</span>
              <h1 className="text-4xl font-bold font-heading gradient-text mb-2">
                404
              </h1>
              <p className="text-slate mb-6">Page not found</p>
              <a
                href="/"
                className="px-6 py-2.5 bg-gradient-to-r from-rose-deep to-rose-medium text-white rounded-full font-medium"
              >
                Go Home
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
