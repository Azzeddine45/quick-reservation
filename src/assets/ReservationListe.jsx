import React from 'react';

function ReservationListe({ reservations, onExport }) {
  // Tri par date et heure (les plus récentes en bas)
  const sortedReservations = [...reservations].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.slot}`);
    const dateB = new Date(`${b.date} ${b.slot}`);
    return dateA - dateB;
  });

  return (
    <>
      <h2 className="text-lg font-bold mb-2 text-gray-800">Réservations :</h2>
      <ul className="space-y-2 text-sm text-gray-700 max-h-64 overflow-auto">
        {sortedReservations.map((r, index) => (
          <li key={index} className="border p-3 rounded bg-gray-50">
            <strong>{r.name}</strong> ({r.email}) – {r.slot} le {r.date}
          </li>
        ))}
      </ul>
      <button
        onClick={onExport}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        📤 Exporter en CSV
      </button>
    </>
  );
}

export default ReservationListe;
