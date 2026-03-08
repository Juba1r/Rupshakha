"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle, CreditCard, Truck } from "lucide-react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, user } = useCart();
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    payment_method: "COD",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + parseFloat(item.price.toString()) * item.quantity,
    0,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || cart.length === 0) return;
    setLoading(true);

    try {
      const orderPayload = {
        user_id: user.id,
        total: subtotal,
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        ...formData,
      };

      const response = await api.post("/place-order.php", orderPayload);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 3000);
      }
    } catch (error) {
      console.error("Order error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen pt-40 text-center">
        <Navbar />
        <h1 className="text-3xl font-bold mb-4">Please log in to checkout.</h1>
        <Link href="/login" className="text-luxury-gold hover:underline">
          Go to Login
        </Link>
      </main>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center text-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel p-12 max-w-md"
        >
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-white/60 mb-8">
            Your elegant choice is now being processed. Redirecting to your
            dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32">
      <Navbar />

      <div className="container mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-bold brand-font mb-8">
              Shipping Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-luxury-gold"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-luxury-gold"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-luxury-gold"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">
                  Detailed Address
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:outline-none focus:border-luxury-gold"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <h2 className="text-3xl font-bold brand-font pt-8 mb-8">
                Payment Method
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <label
                  className={`flex items-center justify-between p-6 rounded-lg border cursor-pointer transition-all ${formData.payment_method === "COD" ? "border-luxury-gold bg-luxury-gold/5" : "border-white/10 hover:border-white/30"}`}
                >
                  <div className="flex items-center space-x-4">
                    <Truck className="text-luxury-gold" />
                    <span className="font-bold">Cash On Delivery</span>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    className="hidden"
                    checked={formData.payment_method === "COD"}
                    onChange={() =>
                      setFormData({ ...formData, payment_method: "COD" })
                    }
                  />
                </label>
                <label
                  className={`flex items-center justify-between p-6 rounded-lg border cursor-pointer opacity-50 grayscale transition-all ${formData.payment_method === "ONLINE" ? "border-luxury-gold bg-luxury-gold/5" : "border-white/10"}`}
                >
                  <div className="flex items-center space-x-4">
                    <CreditCard className="text-white/40" />
                    <span className="font-bold text-white/40">
                      bKash / SSLCommerz (Coming Soon)
                    </span>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    className="hidden"
                    disabled
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full bg-luxury-gold text-black font-bold py-5 rounded-full mt-10 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>CONFIRM PURCHASE</span>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:pl-16"
          >
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-bold mb-8">Your Order</h3>
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded overflow-hidden">
                        <img
                          src={item.image}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-white/40">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold">
                      $
                      {(
                        parseFloat(item.price.toString()) * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3">
                <div className="flex justify-between text-white/60">
                  <span>Shipping Charge</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/5 mt-4">
                  <span>Total Amount</span>
                  <span className="text-luxury-gold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CheckoutPage;
