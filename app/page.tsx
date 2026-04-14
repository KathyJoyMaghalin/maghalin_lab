import Link from "next/link";

export default function Home() {
  return (
    <main style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Greenies</h1>
      <p>A simple online platform created by:</p>
      <h4>Kathy Joy Maghalin</h4>

      <Link href="/login">
        <button>Get Started</button>
      </Link>
    </main>


  );
}
