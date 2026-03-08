"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Package, Clock, ChevronDown } from "lucide-react";

import { useCart } from "@/context/CartContext";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useCart();

  useEffect(() => {
    if (user) {
      fetchOrders(user.id);
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async (userId: number) => {
    try {
      const response = await api.get(`/user-orders.php?user_id=${userId}`);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!user)
    return (
      <main className="min-h-screen pt-40 text-center">
        <Navbar />
        <h1 className="text-3xl font-bold mb-4">
          Please log in to view your orders.
        </h1>
        <a href="/login" className="text-luxury-gold hover:underline">
          Go to Login
        </a>
      </main>
    );

  return (
    <main className="min-h-screen pt-32">
      <Navbar />

      <div className="container mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold brand-font mb-2">
              My Legacy
            </h1>
            <p className="text-white/40">
              Welcome back, {user.name}. Here are your curated circles.
            </p>
          </div>
          <button
            onClick={logout}
            className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          >
            LOGOUT
          </button>
        </div>

        <div className="space-y-8">
          {orders.length === 0 ? (
            <div className="text-center py-20 glass-panel">
              <Package size={48} className="mx-auto text-white/10 mb-4" />
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : (
            orders.map((order: any) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel overflow-hidden"
              >
                <div className="p-6 border-b border-white/5 flex flex-wrap justify-between items-center gap-4 bg-white/[0.02]">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-luxury-gold/10 text-luxury-gold rounded-full">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-tighter">
                        Order ID
                      </p>
                      <p className="font-bold">#RUP-{order.id}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-tighter text-right">
                      Date
                    </p>
                    <div className="flex items-center text-sm font-bold">
                      <Clock size={14} className="mr-1 text-white/20" />
                      {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-tighter text-right">
                      Status
                    </p>
                    <span className="text-xs bg-luxury-gold/20 text-luxury-gold px-3 py-1 rounded-full font-bold">
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-tighter text-right">
                      Total
                    </p>
                    <p className="text-xl font-bold text-luxury-gold">
                      ${parseFloat(order.total).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">
                    Items
                  </h4>
                  <div className="space-y-4">
                    {order.items?.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-white/5 rounded"></div>
                          <p className="text-sm font-medium">
                            {item.product_name}{" "}
                            <span className="text-white/40 text-xs">
                              x{item.quantity}
                            </span>
                          </p>
                        </div>
                        <p className="text-sm border-b border-white/10 italic">
                          Premium Piece
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Dashboard;
