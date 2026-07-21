import { useState } from "react";

const Slots = () => {
  const [slots] = useState([
    { id: 1, slot: "A1", status: "Occupied", vehicle: "PB10AB1234" },
    { id: 2, slot: "A2", status: "Available", vehicle: null },
    { id: 3, slot: "A3", status: "Occupied", vehicle: "PB08CD5678" },
    { id: 4, slot: "A4", status: "Available", vehicle: null },
    { id: 5, slot: "A5", status: "Occupied", vehicle: "DL01XY9999" },
    { id: 6, slot: "B1", status: "Available", vehicle: null },
    { id: 7, slot: "B2", status: "Occupied", vehicle: "HR26AB1111" },
    { id: 8, slot: "B3", status: "Available", vehicle: null },
    { id: 9, slot: "B4", status: "Available", vehicle: null },
    { id: 10, slot: "B5", status: "Occupied", vehicle: "PB91XY2222" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Parking Slots
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`rounded-xl shadow-md p-5 text-center transition hover:scale-105 ${
              slot.status === "Available"
                ? "bg-green-100 border border-green-400"
                : "bg-red-100 border border-red-400"
            }`}
          >
            <h2 className="text-2xl font-bold mb-3">
              {slot.slot}
            </h2>

            <p
              className={`font-semibold ${
                slot.status === "Available"
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {slot.status}
            </p>

            {slot.vehicle ? (
              <p className="mt-3 text-sm text-gray-700">
                {slot.vehicle}
              </p>
            ) : (
              <p className="mt-3 text-sm text-gray-500">
                Empty
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slots;