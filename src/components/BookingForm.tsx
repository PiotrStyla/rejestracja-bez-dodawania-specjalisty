import React, { useState } from 'react';
import { Clock, User, Calendar } from 'lucide-react';

interface BookingFormProps {
  specialist: string | null;
  date: Date | null;
  time: string | null;
}

const BookingForm: React.FC<BookingFormProps> = ({ specialist, date, time }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Rezerwacja:', { specialist, date, time, name, email, phone });
    alert('Rezerwacja została złożona!');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-blue-500" />
        Zarezerwuj wizytę
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User className="w-4 h-4 inline mr-1" />
            Specjalista
          </label>
          <input 
            type="text" 
            value={specialist || ''} 
            readOnly 
            className="w-full p-2 bg-gray-100 rounded-md" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="w-4 h-4 inline mr-1" />
            Data i godzina
          </label>
          <input 
            type="text" 
            value={date && time ? `${date.toLocaleDateString('pl-PL')} ${time}` : ''} 
            readOnly 
            className="w-full p-2 bg-gray-100 rounded-md" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Imię i nazwisko</label>
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
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
          <input 
            type="tel" 
            id="phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Zarezerwuj
        </button>
      </form>
    </div>
  );
};

export default BookingForm;