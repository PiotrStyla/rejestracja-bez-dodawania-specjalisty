import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Briefcase, FileText } from 'lucide-react';

const PublicProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Profil publiczny</h2>
      <div className="flex flex-col items-center mb-6">
        {user.profilePicture ? (
          <img src={user.profilePicture} alt="Zdjęcie profilowe" className="w-32 h-32 rounded-full object-cover mb-4" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <h3 className="text-xl font-semibold">{user.name}</h3>
      </div>
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2 flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
          Specjalizacja
        </h4>
        <p>{user.specialization}</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-500" />
          O mnie
        </h4>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};

export default PublicProfile;