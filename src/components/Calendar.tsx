import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

interface CalendarProps {
  onSelect: (date: Date, time: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      onSelect(selectedDate, time);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
        Wybierz datę i godzinę
      </h2>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {dates.map((date) => (
          <button
            key={date.toISOString()}
            onClick={() => handleDateSelect(date)}
            className={`p-2 text-center ${
              selectedDate?.toDateString() === date.toDateString()
                ? 'bg-blue-500 text-white'
                : 'bg-blue-100 hover:bg-blue-200'
            } rounded transition duration-150 ease-in-out`}
          >
            <div className="text-xs">{date.toLocaleDateString('pl-PL', { weekday: 'short' })}</div>
            <div>{date.getDate()}</div>
          </button>
        ))}
      </div>
      {selectedDate && (
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            Dostępne godziny
          </h3>
          <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded text-sm transition duration-150 ease-in-out"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;