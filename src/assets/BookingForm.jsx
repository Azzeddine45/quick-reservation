import React from 'react';

function BookingForm({
  selectedSlot,
  selectedDate,
  name,
  email,
  confirmed,
  onNameChange,
  onEmailChange,
  onDateChange,
  onSubmit,
}) {
  return (
    <>
      <p className="text-sm text-gray-700 mb-2 text-center">
        Créneau sélectionné : <strong>{selectedSlot}</strong>
      </p>
      {selectedSlot && selectedDate && (
        <p className="text-sm text-gray-700 mb-2 text-center">
          Réservation pour le <strong>{selectedDate}</strong> à <strong>{selectedSlot}</strong>
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Votre nom"
          className="w-full border p-2 rounded"
          value={name}
          onChange={onNameChange}
          required
        />
        <input
          type="email"
          placeholder="Votre email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={onEmailChange}
          required
        />

        <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date de réservation :
            </label>
            <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={onDateChange}
                className="w-full border p-2 rounded"
                required
            />
        </div>

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
  );
}

export default BookingForm;
