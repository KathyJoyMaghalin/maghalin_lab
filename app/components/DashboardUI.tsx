type Props = {
  email: string;
};

export default function DashboardUI({ email }: Props) {
  return (
    <div className="container">
      <h1>Welcome!</h1>
      <p>You are logged in as:</p>
      <h3>{email}</h3>
    </div>
  );
}