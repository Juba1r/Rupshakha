"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  MapPin,
  Phone,
  User,
  Check,
  Trash2,
  ChevronDown,
} from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/admin-orders.php");
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: number, status: string) => {
    try {
      const response = await api.post("/admin-update-order.php", {
        order_id: orderId,
        status,
      });
      if (response.data.success) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, status } : o)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading Orders...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold brand-font mb-2">Order Vault</h1>
          <p className="text-white/40">
            Manage all customer transactions and fulfillment.
          </p>
        </div>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          <button className="px-4 py-1 text-xs font-bold rounded-full bg-luxury-gold text-black">
            ALL
          </button>
          <button className="px-4 py-1 text-xs font-bold rounded-full text-white/40 hover:text-white">
            PENDING
          </button>
          <button className="px-4 py-1 text-xs font-bold rounded-full text-white/40 hover:text-white">
            SHIPPED
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="glass-panel overflow-hidden">
            <div
              className="p-6 cursor-pointer flex flex-wrap items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors"
              onClick={() =>
                setExpandedId(expandedId === order.id ? null : order.id)
              }
            >
              <div className="flex items-center space-x-6">
                <div className="text-luxury-gold font-bold">
                  #RUP-{order.id}
                </div>
                <div>
                  <p className="text-sm font-bold">{order.user_name}</p>
                  <p className="text-[10px] text-white/20 uppercase tracking-tighter">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex justify-center">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-white/5 rounded flex -space-x-4 overflow-hidden">
                    {order.items.map((item: any, i: number) => (
                      <img
                        key={i}
                        src={item.image}
                        className="w-full h-full object-cover border border-black"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-white/40">
                    {order.items.length} items
                  </span>
                </div>
              </div>

              <div className="font-bold text-luxury-gold text-lg">
                ${parseFloat(order.total).toFixed(2)}
              </div>

              <div className="flex items-center space-x-4">
                <select
                  className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-colors ${
                    order.status === "Delivered"
                      ? "border-green-500 text-green-500"
                      : order.status === "Shipped"
                        ? "border-blue-500 text-blue-500"
                        : "border-luxury-gold text-luxury-gold"
                  } bg-transparent outline-none`}
                  value={order.status}
                  onChange={(e) => {
                    e.stopPropagation();
                    updateStatus(order.id, e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="Pending" className="bg-black">
                    PENDING
                  </option>
                  <option value="Shipped" className="bg-black">
                    SHIPPED
                  </option>
                  <option value="Delivered" className="bg-black">
                    DELIVERED
                  </option>
                  <option value="Cancelled" className="bg-black">
                    CANCELLED
                  </option>
                </select>
                <ChevronDown
                  className={`text-white/20 transition-transform ${expandedId === order.id ? "rotate-180" : ""}`}
                  size={18}
                />
              </div>
            </div>

            <AnimatePresence>
              {expandedId === order.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="p-8 bg-white/[0.01] border-t border-white/5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-luxury-gold border-b border-luxury-gold/20 pb-2">
                        Shipping Details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 text-sm">
                          <User size={16} className="text-white/20 mt-1" />
                          <p>{order.full_name}</p>
                        </div>
                        <div className="flex items-start space-x-3 text-sm">
                          <Phone size={16} className="text-white/20 mt-1" />
                          <p>{order.phone}</p>
                        </div>
                        <div className="flex items-start space-x-3 text-sm">
                          <MapPin size={16} className="text-white/20 mt-1" />
                          <p>
                            {order.address}, {order.city}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 border-b border-white/10 pb-2">
                        Order Content
                      </h4>
                      <div className="space-y-4">
                        {order.items.map((item: any, i: number) => (
                          <div
                            key={i}
                            className="flex justify-between items-center text-sm"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-white/5 rounded overflow-hidden">
                                <img
                                  src={item.image}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <p>
                                {item.product_name}{" "}
                                <span className="text-white/20">
                                  x{item.quantity}
                                </span>
                              </p>
                            </div>
                            <p className="font-bold text-luxury-gold">
                              ${item.product_price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 border-b border-white/10 pb-2">
                        Payment
                      </h4>
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-xs text-white/40 mb-1">
                          Payment Method
                        </p>
                        <p className="font-bold mb-4">{order.payment_method}</p>
                        <p className="text-xs text-white/40 mb-1">
                          Transaction Status
                        </p>
                        <p className="text-green-500 font-bold">COMPLETED</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
