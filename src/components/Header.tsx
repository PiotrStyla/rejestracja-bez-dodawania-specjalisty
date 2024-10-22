import React from 'react';
import { Calendar, LogOut, UserPlus, User, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="w-8 h-8 mr-2" />
          <span className="text-xl font-bold">Rezerwacje Specjalistów</span>
        </div>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="hover:underline">Strona główna</Link></li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to={user?.role === 'admin' ? '/admin-dashboard' : '/specialist-dashboard'} className="hover:underline">
                    Panel {user?.role === 'admin' ? 'Administratora' : 'Specjalisty'}
                  </Link>
                </li>
                {user?.role === 'admin' && (
                  <li>
                    <Link to="/admin-settings" className="hover:underline flex items-center">
                      <Settings className="w-4 h-4 mr-1" />
                      Ustawienia
                    </Link>
                  </li>
                )}
                <li className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>{user?.email}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center hover:underline">
                    <LogOut className="w-4 h-4 mr-1" />
                    Wyloguj
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/specialist-login" className="hover:underline">Logowanie specjalisty</Link></li>
                <li><Link to="/admin-login" className="hover:underline">Logowanie admina</Link></li>
                <li>
                  <Link to="/admin-registration" className="flex items-center hover:underline">
                    <UserPlus className="w-4 h-4 mr-1" />
                    Rejestracja admina
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;