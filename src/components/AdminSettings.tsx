import React, { useState } from 'react';
import { Settings, Key } from 'lucide-react';
import ChangePasswordForm from './ChangePasswordForm';

const AdminSettings: React.FC = () => {
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <Settings className="w-6 h-6 mr-2 text-blue-500" />
        Ustawienia administratora
      </h2>
      <button
        onClick={() => setShowChangePasswordForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center"
      >
        <Key className="w-4 h-4 mr-2" />
        Zmień hasło
      </button>
      {showChangePasswordForm && (
        <ChangePasswordForm onClose={() => setShowChangePasswordForm(false)} />
      )}
      {/* Tutaj możesz dodać więcej opcji ustawień */}
    </div>
  );
};

export default AdminSettings;