import { useState } from "react";
import VehicleForm from "../components/VehicleForm";

const Entry = () => {
  // Success response after allocation
  const [allocation, setAllocation] = useState(null);

  // Temporary parking statistics (Later from backend)
  const parkingStats = {
    totalSlots: 100,
    availableSlots: 42,
    occupiedSlots: 58,
    nextAvailableSlot: "A12",
  };

  const handleAllocate = (vehicleData) => {
    console.log("Vehicle Data:", vehicleData);

    // Temporary dummy response
    setAllocation({
      vehicleNumber: vehicleData.vehicleNumber,
      vehicleType: vehicleData.vehicleType,
      slot: "A12",
      entryTime: new Date().toLocaleTimeString(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Vehicle Entry
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <VehicleForm onAllocate={handleAllocate} />
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-5">
            Parking Status
          </h2>

          <div className="space-y-4">
            <StatusCard
              title="Total Slots"
              value={parkingStats.totalSlots}
            />

            <StatusCard
              title="Available Slots"
              value={parkingStats.availableSlots}
            />

            <StatusCard
              title="Occupied Slots"
              value={parkingStats.occupiedSlots}
            />

            <StatusCard
              title="Next Available"
              value={parkingStats.nextAvailableSlot}
            />
          </div>
        </div>
      </div>

      {/* Success Card */}
      {allocation && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Vehicle Registered Successfully
          </h2>

          <div className="space-y-2">
            <p>
              <strong>Vehicle:</strong> {allocation.vehicleNumber}
            </p>

            <p>
              <strong>Type:</strong> {allocation.vehicleType}
            </p>

            <p>
              <strong>Allocated Slot:</strong> {allocation.slot}
            </p>

            <p>
              <strong>Entry Time:</strong> {allocation.entryTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusCard = ({ title, value }) => {
  return (
    <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
      <span className="font-medium text-gray-600">{title}</span>
      <span className="text-lg font-bold text-blue-600">
        {value}
      </span>
    </div>
  );
};

export default Entry;