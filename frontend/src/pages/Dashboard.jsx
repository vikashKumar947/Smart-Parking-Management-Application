import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaParking,
  FaCar,
  FaCheckCircle,
  FaRupeeSign,
  FaSignInAlt,
  FaCarSide,
} from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalSlots: 0,
    availableSlots: 0,
    occupiedSlots: 0,
    activeVehicles: 0,
    todayEntries: 0,
    todayRevenue: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/dashboard");
        setDashboard(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Total Slots",
      value: dashboard.totalSlots,
      icon: <FaParking />,
    },
    {
      title: "Available Slots",
      value: dashboard.availableSlots,
      icon: <FaCheckCircle />,
    },
    {
      title: "Occupied Slots",
      value: dashboard.occupiedSlots,
      icon: <FaCar />,
    },
    {
      title: "Active Vehicles",
      value: dashboard.activeVehicles,
      icon: <FaCarSide />,
    },
    {
      title: "Today's Entries",
      value: dashboard.todayEntries,
      icon: <FaSignInAlt />,
    },
    {
      title: "Today's Revenue",
      value: `₹${dashboard.todayRevenue}`,
      icon: <FaRupeeSign />,
    },
  ];

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="dashboard-grid">
        {cards.map((card) => (
          <div className="dashboard-card" key={card.title}>
            <div className="card-icon">{card.icon}</div>

            <div>
              <h4>{card.title}</h4>
              <h2>{card.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;