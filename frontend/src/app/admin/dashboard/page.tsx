"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  DollarSign,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin-stats.php");
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading Stats...</div>;

  const statCards = [
    {
      label: "Total Revenue",
      value: `$${stats?.sales?.toLocaleString()}`,
      icon: <DollarSign className="text-green-500" />,
      trend: "+12.5%",
    },
    {
      label: "Total Orders",
      value: stats?.orders,
      icon: <ShoppingBag className="text-blue-500" />,
      trend: "+5.2%",
    },
    {
      label: "Total Products",
      value: stats?.products,
      icon: <Package className="text-luxury-gold" />,
      trend: "Active",
    },
    {
      label: "Total Customers",
      value: stats?.users,
      icon: <Users className="text-purple-500" />,
      trend: "+3 new",
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold brand-font mb-2">
          Executive Overview
        </h1>
        <p className="text-white/40">
          Real-time performance analytics for Rupshakha.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-xl">{card.icon}</div>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                {card.trend}
              </span>
            </div>
            <h3 className="text-white/40 text-sm mb-1">{card.label}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 min-h-[400px]">
          <h3 className="text-xl font-bold mb-8 flex items-center">
            <TrendingUp size={20} className="mr-3 text-luxury-gold" />
            Sales Performance
          </h3>
          <div className="h-64 flex items-end justify-between px-4">
            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="w-8 bg-luxury-gold/20 rounded-t-lg group relative"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-luxury-gold" />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-luxury-gold text-black text-[10px] font-bold px-2 py-1 rounded">
                  {h * 10}%
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-4 px-4 text-xs text-white/20">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="glass-panel p-8">
          <h3 className="text-xl font-bold mb-8">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-luxury-gold glow-gold" />
                <div className="flex-1">
                  <p className="text-sm">New order placed by customer #00{i}</p>
                  <p className="text-[10px] text-white/20 uppercase">
                    2 hours ago
                  </p>
                </div>
                <button className="text-[10px] font-bold text-white/40 hover:text-white transition-colors">
                  VIEW
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
