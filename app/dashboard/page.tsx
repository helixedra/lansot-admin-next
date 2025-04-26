import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/sign-in");
  }

  const user = session.user;

  const handleSignOut = async () => {
    "use server";
    await auth.api.signOut({ headers: await headers() });
    redirect("/");
  };

  return (
    <div>
      Dashboard - {user.email}
      <form action={handleSignOut}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
