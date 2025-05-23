"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const signInWithGoogle = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: () => {
          //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  const signInWithGitHub = async () => {
    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: () => {
          //redirect to the dashboard or sign in page
          // (e.target as HTMLFormElement).reset();
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/dashboard",
        },
        {
          onRequest: (ctx) => {
            //show loading
          },
          onSuccess: () => {
            //redirect to the dashboard or sign in page
            // (e.target as HTMLFormElement).reset();
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
    <div className="flex flex-col gap-2 max-w-md mx-auto">
      <h1>SignIn</h1>
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
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div>
          <div>
            <h2>Or sign in with</h2>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={signInWithGoogle} type="button">
              Sign In with Google
            </button>

            <button onClick={signInWithGitHub} type="button">
              Sign In with GitHub
            </button>
          </div>
        </div>
        Don't have an account?
        <Link className="text-blue-600" href="/sign-up">
          Sign up
        </Link>
      </div>
    </div>
  );
}
