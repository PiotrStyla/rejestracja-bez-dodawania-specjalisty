import React, { useState } from 'react';
import { UserPlus, X, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface CreateSpecialistAccountProps {
  onClose: () => void;
}

const CreateSpecialistAccount: React.FC<CreateSpecialistAccountProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [temporaryPassword, setTemporaryPassword] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createdSpecialistId, setCreatedSpecialistId] = useState<string | null>(null);
  const { createSpecialistAccount } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setTemporaryPassword(null);
    setCreatedSpecialistId(null);
    setIsLoading(true);

    try {
      const { user, password } = await createSpecialistAccount(name, email, specialization);
      setSuccess('Konto specjalisty zostało utworzone pomyślnie.');
      setTemporaryPassword(password);
      setCreatedSpecialistId(user.id);
      setName('');
      setEmail('');
      setSpecialization('');
    } catch (error: any) {
      console.error('Błąd podczas tworzenia konta:', error);
      setError(error.message || 'Wystąpił błąd podczas tworzenia konta specjalisty.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <UserPlus className="w-6 h-6 mr-2 text-green-500" />
        Utwórz konto specjalisty
      </h2>
      <button
        onClick={onClose}
        className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
      >
        <X className="w-6 h-6" />
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && (
        <div className="mb-4">
          <p className="text-green-500">{success}</p>
          {temporaryPassword && (
            <p className="mt-2">
              Tymczasowe hasło: <strong>{temporaryPassword}</strong>
              <br />
              Proszę przekazać to hasło specjaliście. Będzie musiał je zmienić przy pierwszym logowaniu.
            </p>
          )}
          {createdSpecialistId && (
            <Link
              to={`/public-profile/${createdSpecialistId}`}
              className="mt-2 inline-flex items-center text-blue-500 hover:text-blue-700"
            >
              <Eye className="w-4 h-4 mr-1" />
              Podgląd profilu publicznego
            </Link>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Imię i nazwisko
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
            Specjalizacja
          </label>
          <input
            type="text"
            id="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Tworzenie konta...' : 'Utwórz konto'}
        </button>
      </form>
    </div>
  );
};

export default CreateSpecialistAccount;