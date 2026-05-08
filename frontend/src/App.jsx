import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import './index.css';
import { logout } from './services/api';

const isAuthenticated = () => !!localStorage.getItem('iam_token');

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        localStorage.removeItem('iam_user');
        navigate('/login');
    };

    const user = JSON.parse(localStorage.getItem('iam_user') || '{}');

    return (
        <header style={{ 
            height: '64px', 
            background: 'var(--color-bg-sidebar)', 
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px'
        }}>
            <div style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>
                Identity Access Management
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    {user.nombres ? `Hola, ${user.nombres}` : 'Protección Global Activada'}
                </span>
                {isAuthenticated() && (
                    <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                )}
            </div>
        </header>
    );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main className="app-main page-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
