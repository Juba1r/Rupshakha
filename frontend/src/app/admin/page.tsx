"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminIndex() {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-deep-black flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
