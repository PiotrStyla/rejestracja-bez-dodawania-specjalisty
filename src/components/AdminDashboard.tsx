import React, { useState } from 'react';
import { Calendar, Clock, User, Edit, Trash2, Key, Settings, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ChangePasswordForm from './ChangePasswordForm';
import CreateSpecialistAccount from './CreateSpecialistAccount';

const AdminDashboard: React.FC = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showCreateSpecialistForm, setShowCreateSpecialistForm] = useState(false);
  const { user, logout } = useAuth();

  const specialists = [
    { id: 1, name: 'Anna Kowalska', specialization: 'Psycholog' },
    { id: 2, name: 'Jan Nowak', specialization: 'Logopeda' },
    { id: 3, name: 'Maria Wiśniewska', specialization: 'Terapeuta integracji sensorycznej' },
    { id: 4, name: 'Piotr Zieliński', specialization: 'Muzykoterapeuta' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Panel administratora</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowCreateSpecialistForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 flex items-center"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Dodaj specjalistę
          </button>
          <button
            onClick={() => setShowChangePasswordForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center"
          >
            <Key className="w-4 h-4 mr-2" />
            Zmień hasło
          </button>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Wyloguj
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Lista specjalistów</h3>
          <ul className="space-y-2">
            {specialists.map((specialist) => (
              <li key={specialist.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
                <span>{specialist.name} - {specialist.specialization}</span>
                <button className="text-blue-500 hover:text-blue-700">
                  <Edit className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Zarządzanie wizytami</h3>
          {/* Tu możesz dodać komponenty do zarządzania wizytami */}
        </div>
      </div>

      {showChangePasswordForm && (
        <ChangePasswordForm onClose={() => setShowChangePasswordForm(false)} />
      )}

      {showCreateSpecialistForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <CreateSpecialistAccount onClose={() => setShowCreateSpecialistForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;