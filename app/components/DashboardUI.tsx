type Props = {
  email: string;
};

export default function DashboardUI({ email }: Props) {
  return (
    <div>
      {/* Top Right Header */}
      <div className="topbar">
        <span className="user-email">{email}</span>
      </div>

      {/* Main Content */}
      <div className="container">
        <h1>Welcome!</h1>
        <p>You are logged in.</p>
      </div>
    </div>
  );
}