import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Memuat halaman...</div>}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent(): Promise<ReactNode> {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  switch (session.user.role) {
    case "admin":
      redirect("/admin/dashboard");

    case "eksekutif":
      redirect("/eksekutif/dashboard");

    default:
      redirect("/login");
  }

  return null;
}