import React, { useState, useEffect } from 'react';
import BookingSlot from './BookingSlot';
import ReservationListe from './assets/ReservationListe';
import BookingForm from './assets/BookingForm';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Assure-toi du bon chemin

function App() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const slots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'reservations'));
        const data = snapshot.docs.map(doc => doc.data());
        setReservations(data);
      } catch (error) {
        console.error('Erreur de chargement Firestore :', error);
      }
    };

    fetchReservations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isDuplicate = reservations.some(
      (r) =>
        r.email === email &&
        r.date === selectedDate &&
        r.slot === selectedSlot
    );
  
    if (isDuplicate) {
      alert("Une réservation existe déjà pour ce créneau avec cet email.");
      return;
    }
  
    const newReservation = {
      name,
      email,
      slot: selectedSlot,
      date: selectedDate,
    };

    try {
      await addDoc(collection(db, 'reservation'), newReservation);
      console.log('Réservation ajoutée !');
      setReservations([...reservations, newReservation]);
      setConfirmed(true);
      setName('');
      setEmail('');
      setSelectedSlot(null);
      setSelectedDate('');
    } catch (error) {
      console.error('Erreur lors de l’ajout : ', error);
    }
    
    setConfirmed(true);
    
    // Optionnel : reset du formulaire
    setName('');
    setEmail('');
    setSelectedSlot(null);
    setConfirmed(true);
    setSelectedDate('');
  };
  const handleBooking = (slot) => {
    setSelectedSlot(slot);
    setConfirmed(false);
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
<div className="min-h-screen bg-gray-100 flex flex-col-reverse md:flex-row items-start justify-center px-4 py-8 gap-4">
<     div className="bg-white rounded shadow p-6 w-full max-w-md fade-in">
        <img
          src="logo.png"
          alt="Logo"
          className="w-20 h-20 mx-auto mb-4"
        />

        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Réservez un créneau
        </h1>

        <div className="mb-4">
          <label htmlFor="slot" className="block text-sm font-medium text-gray-700 mb-1">
            Choisissez un créneau :
          </label>
          <select
            id="slot"
            value={selectedSlot || ''}
            onChange={(e) => handleBooking(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="" disabled>-- Sélectionnez un horaire --</option>
            {slots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        {selectedSlot && (
          <BookingForm
            selectedSlot={selectedSlot}
            selectedDate={selectedDate}
            name={name}
            email={email}
            confirmed={confirmed}
            onNameChange={(e) => setName(e.target.value)}
            onEmailChange={(e) => setEmail(e.target.value)}
            onDateChange={(e) => setSelectedDate(e.target.value)}
            onSubmit={handleSubmit}
          />
        )}

      </div>
      {reservations.length > 0 && (
          <div className="mt-6 ml-4">
            <ReservationListe reservations={reservations} onExport={exportCSV} />
          </div>
        )}
    </div>
  );
}

export default App;
