import { useEffect, useState } from "react";
import { getSlots } from "../services/parkingService";

function Slots() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSlots = async () => {
    try {
      const response = await getSlots();
      console.log(response.data);
      setSlots(response.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch slots");
      setLoading(false);
    }
  };
    fetchSlots();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {slots.map((slot) => (
      <div
        key={slot._id}
        className="bg-white rounded-xl shadow-md p-5 border"
      >
        <h2 className="text-xl font-bold mb-3">
          Slot {slot.slotNumber}
        </h2>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              slot.isOccupied
                ? "text-red-600 font-semibold"
                : "text-green-600 font-semibold"
            }
          >
            {slot.isOccupied ? "Occupied" : "Available"}
          </span>
        </p>

        {slot.isOccupied && (
          <p>
            <strong>Vehicle:</strong> {slot.vehicleNumber}
          </p>
        )}
      </div>
    ))}
  </div>
);
}

export default Slots;