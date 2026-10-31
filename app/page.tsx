import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
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

  return (
    <div>
      <p>Selamat Datang</p>
    </div>
  );
}