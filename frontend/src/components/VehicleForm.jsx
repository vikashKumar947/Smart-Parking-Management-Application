import { useState } from "react";

const VehicleForm = ({ onAllocate }) => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "Car",
    ownerName: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.vehicleNumber.trim()) {
      setError("Vehicle Number is required.");
      return;
    }

    setError("");

    // Send data to Entry.jsx
    onAllocate(formData);

    // Clear form
    setFormData({
      vehicleNumber: "",
      vehicleType: "Car",
      ownerName: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-semibold text-gray-800">
        Vehicle Details
      </h2>

      {/* Vehicle Number */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Vehicle Number
        </label>

        <input
          type="text"
          name="vehicleNumber"
          placeholder="PB10AB1234"
          value={formData.vehicleNumber}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Vehicle Type */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Vehicle Type
        </label>

        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
          <option value="Truck">Truck</option>
        </select>
      </div>

      {/* Owner Name */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Owner Name <span className="text-gray-400">(Optional)</span>
        </label>

        <input
          type="text"
          name="ownerName"
          placeholder="Enter Owner Name"
          value={formData.ownerName}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm font-medium">
          {error}
        </p>
      )}

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
      >
        Allocate Slot
      </button>
    </form>
  );
};

export default VehicleForm;