import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<p>Memeriksa sesi pengguna...</p>}>
      <AuthRedirect />
    </Suspense>
  );
}

async function AuthRedirect() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  switch (session.user.role) {
    case "admin":
      redirect("/admin/dashboard");

    default:
      redirect("/signin");
  }

  return null;
}