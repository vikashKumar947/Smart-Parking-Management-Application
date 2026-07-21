import {
  FaCar,
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="logo">
        <FaCar className="logo-icon" />
        <span>Smart Parking</span>
      </div>

      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search Vehicle..."
        />
      </div>

      <div className="navbar-right">

        <button className="icon-btn">
          <FaBell />
        </button>

        <div className="admin">

          <FaUserCircle className="admin-icon" />

          <span>Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;