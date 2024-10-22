import React, { useState } from 'react';
import { Shield, User, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRegistration: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const { registerAdmin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await registerAdmin(name, email, password);
      setIsRegistered(true);
    } catch (error: any) {
      console.error('Błąd rejestracji:', error);
      setError(error.message || 'Wystąpił nieoczekiwany błąd podczas rejestracji. Spróbuj ponownie.');
    }
  };

  // Reszta komponentu pozostaje bez zmian...
};

export default AdminRegistration;