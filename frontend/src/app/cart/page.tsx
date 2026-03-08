"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import api from "@/lib/api";

import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, user } = useCart();
  const [loading, setLoading] = useState(false); // Context handles fetching now

  const subtotal = cart.reduce(
    (acc, item) => acc + parseFloat(item.price.toString()) * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen pt-32">
      <Navbar />

      <div className="container mx-auto px-6 mb-20">
        <h1 className="text-4xl md:text-5xl font-bold brand-font mb-12">
          Your Shopping Bag
        </h1>

        {!user ? (
          <div className="text-center py-32 glass-panel">
            <h2 className="text-2xl font-bold mb-4">Please log in</h2>
            <p className="text-white/40 mb-8">
              Log in to see the elegance you've selected.
            </p>
            <Link
              href="/login"
              className="bg-luxury-gold text-black px-10 py-4 rounded-full font-bold"
            >
              LOG IN
            </Link>
          </div>
        ) : cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 glass-panel"
          >
            <ShoppingBag size={64} className="mx-auto text-white/10 mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
            <p className="text-white/40 mb-8">
              It seems you haven't added any circles of elegance yet.
            </p>
            <Link
              href="/products"
              className="bg-luxury-gold text-black px-10 py-4 rounded-full font-bold"
            >
              START SHOPPING
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.cart_id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass-panel p-6 flex items-center gap-6"
                  >
                    <div className="w-24 h-24 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image || "/images/placeholder.png"}
                        alt={item.name}
                        className="max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <p className="text-luxury-gold">
                        ${parseFloat(item.price.toString()).toFixed(2)}
                      </p>
                      <p className="text-sm text-white/40">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        item.cart_id && removeFromCart(item.cart_id)
                      }
                      className="p-2 text-white/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 sticky top-32"
              >
                <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Shipping</span>
                    <span className="text-green-500">FREE</span>
                  </div>
                  <div className="h-[1px] bg-white/10 my-4" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-luxury-gold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="w-full bg-luxury-gold text-black font-bold py-4 rounded-full flex items-center justify-center space-x-2 group"
                >
                  <span>CHECKOUT NOW</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default CartPage;
