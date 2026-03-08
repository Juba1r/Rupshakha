"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useCart();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    const u = JSON.parse(storedUser);
    if (u.role !== "admin") {
      router.push("/dashboard");
      return;
    }
    setIsChecking(false);
  }, [router]);

  if (isChecking)
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );

  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/admin/dashboard",
    },
    { label: "Products", icon: <Package size={20} />, href: "/admin/products" },
    { label: "Orders", icon: <ShoppingBag size={20} />, href: "/admin/orders" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed lg:relative z-50 w-64 h-full glass-panel border-y-0 border-l-0 rounded-none p-6 flex flex-col"
          >
            <div className="text-2xl font-bold gold-gradient brand-font tracking-widest mb-12 flex justify-between items-center">
              ADMIN
              <button
                className="lg:hidden text-white/40"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 transition-colors text-white/60 hover:text-white"
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="pt-6 border-t border-white/5">
              <Link
                href="/"
                className="flex items-center space-x-3 p-4 text-white/40 hover:text-luxury-gold transition-colors"
              >
                <ArrowLeft size={18} />
                <span className="text-sm font-bold tracking-tighter">
                  BACK TO SITE
                </span>
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-20 glass-panel border-x-0 border-t-0 rounded-none px-8 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-white/40 hover:text-white p-2"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{user?.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-luxury-gold">
                Master Admin
              </p>
            </div>
            <div className="w-10 h-10 bg-luxury-gold text-black rounded-full flex items-center justify-center font-bold">
              {user?.name?.[0]}
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
