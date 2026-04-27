type Props = {
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;

  email: string;
  password: string;
  username: string;
  message: string;

  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  setUsername: (v: string) => void;

  handleLogin: () => void;
  handleSignUp: () => void;
};

export default function LoginUI({
  mode,
  setMode,
  email,
  password,
  username,
  message,
  setEmail,
  setPassword,
  setUsername,
  handleLogin,
  handleSignUp,
}: Props) {
  return (
    <div className="container">
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>

      {/* EMAIL */}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* PASSWORD */}
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* ACTION BUTTON */}
      {mode === "login" ? (
        <button onClick={handleLogin}>Log In</button>
      ) : (
        <button onClick={handleSignUp}>Sign Up</button>
      )}

      {/* SWITCH MODE */}
     <p>
  {mode === "login"
    ? "Don't have an account?"
    : "Already have an account?"}{" "}
  <span
    style={{
      color: "#2e7d32", // strong green
      fontWeight: "600",
      cursor: "pointer",
      textDecoration: "underline",
    }}
    onClick={() =>
      setMode(mode === "login" ? "signup" : "login")
    }
  >
    {mode === "login" ? "Sign up" : "Log in"}
  </span>
</p>

      <p>{message}</p>
    </div>
  );
}