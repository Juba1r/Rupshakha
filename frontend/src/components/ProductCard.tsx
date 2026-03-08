"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

import { useCart } from "@/context/CartContext";

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
}) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      className="glass-panel p-4 group"
    >
      <div className="relative h-64 overflow-hidden rounded-xl bg-white/5 mb-6">
        <img
          src={image || "/images/placeholder.png"}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-all">
          <Link
            href={`/products/${id}`}
            className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs"
          >
            DETAILS
          </Link>
          <button
            onClick={() => addToCart({ id, name, price, image })}
            className="bg-luxury-gold text-black px-4 py-2 rounded-full font-bold text-xs"
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <h3 className="text-lg font-bold mb-1 truncate">{name}</h3>
      <div className="flex justify-between items-center">
        <p className="text-luxury-gold font-bold">
          ${parseFloat(price.toString()).toFixed(2)}
        </p>
        <span className="text-xs text-white/40">4.8 ★</span>
      </div>
    </motion.div>
  );
};

export default ProductCard;
