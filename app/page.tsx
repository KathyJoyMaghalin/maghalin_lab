import Link from "next/link";

export default function Home() {
  return (
    <main style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Machine Learning Hub</h1>
      <h2>Greenies</h2>
      <p>A simple platform for exploring and learning the basics of machine learning using Supabase and Vercel.  </p>
  

      <Link href="/login">
        <button>Get Started</button>
      </Link>
    </main>


  );
}
