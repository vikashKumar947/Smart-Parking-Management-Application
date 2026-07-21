import { useEffect, useState } from "react";
import { getDashboard } from "../services/parkingService";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) return <h2>Loading...</h2>;

  return (
    <>
      <h2>Total Slots : {dashboard.totalSlots}</h2>
      <h2>Occupied : {dashboard.occupiedSlots}</h2>
      <h2>Available : {dashboard.availableSlots}</h2>
      <h2>Revenue : ₹{dashboard.totalRevenue}</h2>
    </>
  );
}

export default Dashboard;