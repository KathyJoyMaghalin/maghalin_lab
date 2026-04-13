type Props = {
  email: string;
  password: string;
  message: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => void;
  handleSignUp: () => void;
};

export default function LoginUI({
  email,
  password,
  message,
  setEmail,
  setPassword,
  handleLogin,
  handleSignUp,
}: Props) {
  return (
    <div className="container">
      <h2>Login</h2>

      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="button" onClick={handleLogin}>
        Log In
      </button>

      <button className="button" onClick={handleSignUp}>
        Sign Up
      </button>

      <p>{message}</p>
    </div>
  );
}