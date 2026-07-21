import { useEffect, useState } from "react";
import { getHistory } from "../services/parkingService";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await getHistory();

      console.log(response.data);

      setHistory(response.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);

      setError("Unable to load parking history");
      setLoading(false);
    }
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-6">
      Parking History
    </h1>

    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Vehicle</th>
            <th className="border p-3">Owner</th>
            <th className="border p-3">Type</th>
            <th className="border p-3">Slot</th>
            <th className="border p-3">Entry</th>
            <th className="border p-3">Exit</th>
            <th className="border p-3">Fee</th>
          </tr>
        </thead>

        <tbody>
          {history.map((record) => (
            <tr key={record._id}>
              <td className="border p-3">
                {record.vehicle.vehicleNumber}
              </td>

              <td className="border p-3">
                {record.vehicle.ownerName}
              </td>

              <td className="border p-3">
                {record.vehicle.vehicleType}
              </td>

              <td className="border p-3">
                {record.slot.slotNumber}
              </td>

              <td className="border p-3">
                {new Date(record.entryTime).toLocaleString()}
              </td>

              <td className="border p-3">
                {record.exitTime
                  ? new Date(record.exitTime).toLocaleString()
                  : "Still Parked"}
              </td>

              <td className="border p-3">
                ₹{record.parkingFee}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default History;
