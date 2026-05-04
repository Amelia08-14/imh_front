"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminSession } from "@/components/dashboard-shell";

export default function DashboardIndexPage() {
  const router = useRouter();
  const { identity } = useAdminSession();
  useEffect(() => {
    if (identity?.role === "super_admin") router.replace("/dashboard/salons");
    else if (identity?.role === "manager") router.replace("/dashboard/appointments");
  }, [router, identity?.role]);
  return null;
}
