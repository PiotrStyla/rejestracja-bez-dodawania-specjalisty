import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SpecialistLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, changePassword, updateUserMetadata } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await login(email, password);
      console.log('Zalogowany użytkownik:', user);

      if (user && user.user_metadata && user.user_metadata.role === 'specialist') {
        if (user.user_metadata.isFirstLogin) {
          // Redirect to change password page or show change password form
          // For now, we'll just log a message
          console.log('Pierwsze logowanie - należy zmienić hasło');
          // Here you would typically redirect to a change password page
          // navigate('/change-password');
        } else {
          navigate('/specialist-dashboard');
        }
      } else {
        setError('Brak uprawnień specjalisty.');
      }
    } catch (error: any) {
      console.error('Błąd logowania:', error);
      setError('Nieprawidłowe dane logowania lub problem z połączeniem');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (newPassword: string) => {
    try {
      await changePassword(password, newPassword);
      await updateUserMetadata({ isFirstLogin: false });
      // Redirect to specialist dashboard after password change
      navigate('/specialist-dashboard');
    } catch (error: any) {
      console.error('Błąd zmiany hasła:', error);
      setError('Wystąpił problem podczas zmiany hasła');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <LogIn className="w-6 h-6 mr-2 text-blue-500" />
        Logowanie dla specjalistów
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>
    </div>
  );
};

export default SpecialistLogin;