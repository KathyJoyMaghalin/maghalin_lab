import Link from "next/link";

export default function Home() {
  return (
    <main style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Machine Learning Hub</h1>
      <p>A simple platform for ML enthusiasts.</p>

      <Link href="/login">
        <button>Get Started</button>
      </Link>
    </main>


  );
}
