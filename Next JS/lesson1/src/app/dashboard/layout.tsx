import Link from "next/link";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>
        <Link href="/dashboard/analytics">Аналитика</Link>{" "}
        <Link href="/dashboard/settings">Настройки</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
