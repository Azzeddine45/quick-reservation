import React, { useState, useEffect } from 'react';
import BookingSlot from './BookingSlot';
import ReservationListe from './assets/ReservationListe';


function App() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const slots = ['09:00', '10:00', '11:00', '14:00', '15:00'];
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('reservations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);
  const handleBooking = (slot) => {
    setSelectedSlot(slot);
    setConfirmed(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      name,
      email,
      slot: selectedSlot,
      date: new Date().toLocaleDateString(),
    };
    
    setReservations([...reservations, newReservation]);
    setConfirmed(true);
    
    // Optionnel : reset du formulaire
    setName('');
    setEmail('');
    setSelectedSlot(null);
        setConfirmed(true);
  };
    const exportCSV = () => {
      const headers = ['Nom', 'Email', 'Créneau', 'Date'];
      const rows = reservations.map((r) => [r.name, r.email, r.slot, r.date]);
    
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
    
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'reservations.csv');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded shadow p-6 w-full max-w-md fade-in">
        <img
          src="logo.png"
          alt="Logo"
          className="w-20 h-20 mx-auto mb-4"
        />

        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Réservez un créneau
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {slots.map((slot) => (
            <BookingSlot key={slot} slot={slot} onBook={handleBooking} />
          ))}
        </div>

        {selectedSlot && (
          <>
            <p className="text-sm text-gray-700 mb-2 text-center">
              Créneau sélectionné : <strong>{selectedSlot}</strong>
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full border p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Votre email"
                className="w-full border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold"
              >
                Confirmer la réservation
              </button>
            </form>

            {confirmed && (
              <p className="mt-4 text-green-600 font-medium text-center">
                ✅ Réservation confirmée pour <strong>{selectedSlot}</strong> !
              </p>
            )}
          </>
        )}
      </div>
      {reservations.length > 0 && (
          <div className="mt-6">
            <ReservationListe reservations={reservations} onExport={exportCSV} />
          </div>
        )}
    </div>
  );
}

export default App;
