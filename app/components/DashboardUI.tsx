type Props = {
  email: string;
  handleLogout: () => void;
};

export default function DashboardUI({ email, handleLogout }: Props) {
  return (
    <div>
      {/* Top bar */}
      <div className="topbar">
        <span className="user-email">{email}</span>
      </div>

      {/* Main content */}
      <div className="container">
        <h1>Welcome!</h1>
        <p>You are logged in.</p>
      </div>

      {/* Bottom logout */}
      <div className="bottom-bar">
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}