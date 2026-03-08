"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useCart();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/login.php", formData);
      if (response.data.success) {
        login(response.data.user);
        router.push("/dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 flex flex-col items-center">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-panel p-10 mt-10 mb-20"
      >
        <h1 className="text-4xl font-bold brand-font text-center mb-10 gold-gradient">
          Welcome Back
        </h1>

        {error && (
          <p className="bg-red-500/10 text-red-500 p-4 rounded mb-6 text-sm text-center border border-red-500/20">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-luxury-gold"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-luxury-gold"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-luxury-gold text-black font-bold py-4 rounded-full transition-all flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>LOGIN</span>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-white/40 text-sm">
          New to Rupshakha?{" "}
          <Link href="/signup" className="text-luxury-gold hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>

      <Footer />
    </main>
  );
};

export default LoginPage;
