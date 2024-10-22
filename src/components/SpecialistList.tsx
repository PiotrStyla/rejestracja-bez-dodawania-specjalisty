import React from 'react';
import { User } from 'lucide-react';

interface SpecialistListProps {
  onSelect: (specialist: string) => void;
}

const specialists = [
  { id: 1, name: 'Anna Kowalska', specialization: 'Psycholog' },
  { id: 2, name: 'Jan Nowak', specialization: 'Logopeda' },
  { id: 3, name: 'Maria Wiśniewska', specialization: 'Terapeuta integracji sensorycznej' },
  { id: 4, name: 'Piotr Zieliński', specialization: 'Muzykoterapeuta' },
];

const SpecialistList: React.FC<SpecialistListProps> = ({ onSelect }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <User className="w-5 h-5 mr-2 text-blue-500" />
        Wybierz specjalistę
      </h2>
      <ul className="space-y-2">
        {specialists.map((specialist) => (
          <li 
            key={specialist.id} 
            className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer transition duration-150 ease-in-out" 
            onClick={() => onSelect(specialist.name)}
          >
            <div>
              <p className="font-medium">{specialist.name}</p>
              <p className="text-sm text-gray-600">{specialist.specialization}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialistList;