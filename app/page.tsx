import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <h1>Home</h1>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/sign-up">Sign Up</Link>
    </div>
  );
}
