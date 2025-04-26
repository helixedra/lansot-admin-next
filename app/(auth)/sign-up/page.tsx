"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authClient.signUp.email(
        {
          email,
          name: "",
          password,
          image: "",
          callbackURL: "/sign-in",
        },
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: () => {
            //redirect to the dashboard or sign in page
            (e.target as HTMLFormElement).reset();
          },
          onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
          },
        }
      );
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>SignUp</h1>
      <div>
        <form
          className="flex flex-col gap-2 max-w-md mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <Link href="/sign-in">Already have an account? Sign in</Link>
      </div>
    </div>
  );
}
