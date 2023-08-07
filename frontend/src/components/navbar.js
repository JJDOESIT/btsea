import "../styles/navbar.css";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-title">
        <p>
          <a href="/">BTSea</a>
        </p>
      </div>
      <div className="navbar-links-container">
        <div className="navbar-links">
          <p>
            <a href="/register/">Sign Up</a>
          </p>
        </div>
        <div className="navbar-links">
          <p>
            <a href="/login/">Login</a>
          </p>
        </div>
        <div className="navbar-links">
          <p>
            <a href="/dashboard/">Dashboard</a>
          </p>
        </div>
        <div className="navbar-links">
          <p>
            <a href="/analytics/">Analytics</a>
          </p>
        </div>
      </div>
    </div>
  );
}
