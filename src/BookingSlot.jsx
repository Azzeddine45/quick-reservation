import React from "react";

function BookingSlot({ slot, onBook }) {
    // Ce composant reçoit deux props :
    // - slot : l'heure du créneau (ex: "14:00")
    // - onBook : une fonction qui sera appelée quand on clique sur le bouton
  
    return (
      <button
        onClick={() => onBook(slot)}
        className="p-2 border rounded m-1 hover:bg-blue-100"
      >
        {slot}
      </button>
    );
  }

  export default BookingSlot;
