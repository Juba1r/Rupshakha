"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Gift, Coffee, Sparkles, Moon } from "lucide-react";
import Link from "next/link";

const GiftGuidePage = () => {
  const personas = [
    {
      icon: <Sparkles />,
      title: "The Modern Bride",
      desc: "Statement diamonds for a lifetime of brilliance.",
      tag: "BRIDAL",
    },
    {
      icon: <Coffee />,
      title: "The Daily Minimalist",
      desc: "Subtle gold bands for constant elegance.",
      tag: "ESSENTIALS",
    },
    {
      icon: <Moon />,
      title: "The Night Owl",
      desc: "Intricate patterns that glow in low light.",
      tag: "NOIR",
    },
    {
      icon: <Gift />,
      title: "The Heirloom",
      desc: "Traditional filigree for the next generation.",
      tag: "HERITAGE",
    },
  ];

  return (
    <main className="min-h-screen pt-32">
      <Navbar />

      <div className="container mx-auto px-6 mb-24">
        <header className="text-center max-w-2xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-bold brand-font mb-6"
          >
            The <span className="gold-gradient">Giftery</span>
          </motion.h1>
          <p className="text-white/40">
            Select the perfect circle for your loved ones based on their unique
            aura.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {personas.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel p-10 group hover:border-luxury-gold/50 transition-all cursor-pointer text-center"
            >
              <div className="w-20 h-20 bg-white/5 text-luxury-gold rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-luxury-gold group-hover:text-black transition-all">
                {p.icon}
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mb-2 block">
                {p.tag}
              </span>
              <h3 className="text-2xl font-bold brand-font mb-4">{p.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-8">
                {p.desc}
              </p>
              <Link
                href="/products"
                className="text-xs font-bold tracking-widest text-luxury-gold underline underline-offset-8 decoration-luxury-gold/20 hover:decoration-luxury-gold transition-all"
              >
                VIEW CURATION
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Hero Packaging */}
        <section className="mt-32 glass-panel overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-12 md:p-24 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold brand-font mb-8">
                The Signature Wrapped Experience
              </h2>
              <p className="text-white/60 text-lg mb-10 leading-relaxed">
                Every Rupshakha gift arrives in our signature velvet-lined noir
                box, sealed with a gold silk ribbon and a hand-written brand
                story. We don't just ship bangles—we deliver memories.
              </p>
              <div className="flex space-x-4">
                <div className="px-6 py-2 rounded-full border border-white/10 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                  Velvet Lining
                </div>
                <div className="px-6 py-2 rounded-full border border-white/10 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                  Gold Seal
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-auto">
              <img
                src="/images/gift.png"
                className="w-full h-full object-cover"
                alt="Luxury Packaging"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-deep-black to-transparent" />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default GiftGuidePage;
