import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Save, Camera, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpecialistProfile: React.FC = () => {
  // ... (pozostała część kodu pozostaje bez zmian)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <User className="w-6 h-6 mr-2 text-blue-500" />
          Edycja profilu specjalisty
        </h2>
        <Link to="/public-profile" className="text-blue-500 hover:text-blue-600 flex items-center">
          <Eye className="w-5 h-5 mr-1" />
          Podgląd profilu publicznego
        </Link>
      </div>
      {/* ... (pozostała część komponentu pozostaje bez zmian) */}
    </div>
  );
};

export default SpecialistProfile;