"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronRight, Star } from "lucide-react";

import { useCart } from "@/context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/product-details.php?id=${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center text-white">
        Product not found
      </div>
    );

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-white/40 text-sm mb-12">
            <span>Shop</span> <ChevronRight size={14} /> <span>Bangles</span>{" "}
            <ChevronRight size={14} />{" "}
            <span className="text-luxury-gold">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-8"
            >
              <div className="relative h-[500px] w-full flex items-center justify-center overflow-hidden">
                <img
                  src={product.image || "/images/placeholder.png"}
                  alt={product.name}
                  className="max-h-full object-contain hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold brand-font mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex text-luxury-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#D4AF37" />
                  ))}
                </div>
                <span className="text-white/40">(120 Reviews)</span>
              </div>

              <p className="text-3xl font-bold text-luxury-gold mb-8">
                ${parseFloat(product.price).toFixed(2)}
              </p>

              <p className="text-white/60 leading-relaxed mb-10 text-lg">
                {product.description ||
                  "A masterpiece of luxury and tradition. This exquisite piece is handcrafted with the highest quality materials, ensuring a shimmer that lasts a lifetime."}
              </p>

              {/* Quantity and Actions */}
              <div className="flex flex-col space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center w-32 border border-white/20 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-white/60 hover:text-white"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-white/60 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 bg-luxury-gold text-black font-bold py-4 rounded-md flex items-center justify-center space-x-2 hover:bg-white transition-all transform active:scale-95"
                  >
                    <ShoppingBag size={20} />
                    <span>ADD TO BAG</span>
                  </button>
                  <button className="px-6 py-4 border border-white/10 hover:border-white transition-colors rounded-md">
                    ♡
                  </button>
                </div>
              </div>

              {/* Extras */}
              <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="text-white/40 mb-1">CRAFTED IN</h4>
                  <p>22K Gold Finish</p>
                </div>
                <div>
                  <h4 className="text-white/40 mb-1">SHIPPING</h4>
                  <p>Express Available</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProductDetails;
