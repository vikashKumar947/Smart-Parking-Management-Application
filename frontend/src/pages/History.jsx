import { useState } from "react";

const History = () => {
  const [history] = useState([
    {
      id: 1,
      vehicleNumber: "PB10AB1234",
      vehicleType: "Car",
      slot: "A12",
      entryTime: "10:15 AM",
      exitTime: "12:45 PM",
      fee: 120,
    },
    {
      id: 2,
      vehicleNumber: "PB08CD5678",
      vehicleType: "Bike",
      slot: "B05",
      entryTime: "09:30 AM",
      exitTime: "11:00 AM",
      fee: 40,
    },
    {
      id: 3,
      vehicleNumber: "DL01XY9999",
      vehicleType: "Truck",
      slot: "C02",
      entryTime: "08:00 AM",
      exitTime: "01:00 PM",
      fee: 400,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Parking History
      </h1>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Vehicle No.</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">Slot</th>
              <th className="px-6 py-4 text-left">Entry</th>
              <th className="px-6 py-4 text-left">Exit</th>
              <th className="px-6 py-4 text-left">Fee</th>
            </tr>
          </thead>

          <tbody>
            {history.map((record) => (
              <tr
                key={record.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {record.vehicleNumber}
                </td>

                <td className="px-6 py-4">
                  {record.vehicleType}
                </td>

                <td className="px-6 py-4">
                  {record.slot}
                </td>

                <td className="px-6 py-4">
                  {record.entryTime}
                </td>

                <td className="px-6 py-4">
                  {record.exitTime}
                </td>

                <td className="px-6 py-4 font-semibold text-green-600">
                  ₹{record.fee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No parking history available.
          </div>
        )}
      </div>
    </div>
  );
};

export default History;