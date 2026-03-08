"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CollectionsPage = () => {
  const collections = [
    {
      title: "The Golden Era",
      subtitle: "Classic 22k Gold",
      desc: "Timeless filigree work passed down through generations.",
      image: "/images/bangle1.png",
      color: "from-yellow-900/40",
    },
    {
      title: "Celestial Diamond",
      subtitle: "VVS1 Brilliants",
      desc: "Inspired by the stars, crafted for the earthly divine.",
      image: "/images/bangle2.png",
      color: "from-blue-900/40",
    },
    {
      title: "Ruby Rose Vault",
      subtitle: "Rose Gold & Rubies",
      desc: "A passionate blend of fire and blush pink gold.",
      image: "/images/bangle3.png",
      color: "from-red-900/40",
    },
  ];

  return (
    <main className="min-h-screen pt-32">
      <Navbar />

      <div className="container mx-auto px-6 mb-24">
        <header className="max-w-3xl mb-20">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-bold brand-font mb-6"
          >
            The <span className="gold-gradient">Vaults</span>
          </motion.h1>
          <p className="text-white/40 text-xl">
            Explore our curated thematic collections, each representing a unique
            chapter of elegance.
          </p>
        </header>

        <div className="space-y-12">
          {collections.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`group relative h-[60vh] rounded-[3rem] overflow-hidden glass-panel border-white/5 bg-gradient-to-br ${c.color} to-transparent`}
            >
              <div className="flex h-full items-center p-12 md:p-20">
                <div className="max-w-xl relative z-10">
                  <span className="text-luxury-gold tracking-[0.3em] font-bold text-xs uppercase mb-4 block">
                    {c.subtitle}
                  </span>
                  <h2 className="text-5xl md:text-6xl font-bold brand-font mb-6 group-hover:text-luxury-gold transition-colors">
                    {c.title}
                  </h2>
                  <p className="text-white/40 text-lg mb-10">{c.desc}</p>

                  <Link
                    href="/products"
                    className="flex items-center space-x-4 font-bold text-sm tracking-widest hover:text-luxury-gold transition-colors"
                  >
                    <span>EXPLORE VAULT</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>

                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full flex items-center justify-center opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000">
                  <img
                    src={c.image}
                    className="max-h-[80%] object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                    alt={c.title}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CollectionsPage;
