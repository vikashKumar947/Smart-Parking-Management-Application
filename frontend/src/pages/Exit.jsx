import { useState } from "react";

const Exit = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicle, setVehicle] = useState(null);

  const handleSearch = () => {
    if (!vehicleNumber.trim()) {
      alert("Please enter a vehicle number.");
      return;
    }

    // Dummy data (replace with backend later)
    setVehicle({
      vehicleNumber,
      vehicleType: "Car",
      slot: "A12",
      entryTime: "10:30 AM",
      duration: "3 Hours",
      fee: 120,
    });
  };

  const handleExit = () => {
    alert("Vehicle exited successfully!");

    // Later call backend API here

    setVehicle(null);
    setVehicleNumber("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Vehicle Exit
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl">

        {/* Search Vehicle */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Vehicle Number
          </label>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="PB10AB1234"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
            >
              Search
            </button>
          </div>
        </div>

        {/* Vehicle Details */}
        {vehicle && (
          <div className="border rounded-xl p-5 bg-gray-50">

            <h2 className="text-xl font-semibold mb-4">
              Vehicle Details
            </h2>

            <div className="space-y-2">
              <p>
                <strong>Vehicle:</strong> {vehicle.vehicleNumber}
              </p>

              <p>
                <strong>Type:</strong> {vehicle.vehicleType}
              </p>

              <p>
                <strong>Allocated Slot:</strong> {vehicle.slot}
              </p>

              <p>
                <strong>Entry Time:</strong> {vehicle.entryTime}
              </p>

              <p>
                <strong>Duration:</strong> {vehicle.duration}
              </p>

              <p className="text-xl font-bold text-green-600">
                Fee: ₹{vehicle.fee}
              </p>
            </div>

            <button
              onClick={handleExit}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
            >
              Complete Exit
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default Exit;