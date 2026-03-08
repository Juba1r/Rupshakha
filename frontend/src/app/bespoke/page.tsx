"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Sparkles, PenTool, Gem, Calendar } from "lucide-react";

const BespokePage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen pt-32">
      <Navbar />

      <div className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-luxury-gold tracking-[0.4em] font-bold text-xs uppercase mb-6 block">
              One of One
            </span>
            <h1 className="text-4xl md:text-7xl font-bold brand-font mb-8">
              Bespoke <br /> <span className="gold-gradient">Creation</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-10">
              Transform your personal story into a wearable masterpiece. Our
              master designers work one-on-one with you to craft a unique circle
              of elegance that exists nowhere else.
            </p>

            <div className="space-y-8 mb-12">
              {[
                {
                  icon: <PenTool size={20} />,
                  title: "Personal Sketching",
                  desc: "Consultation with our lead designers.",
                },
                {
                  icon: <Gem size={20} />,
                  title: "Rare Gem Sourcing",
                  desc: "Access our private vault of diamonds & rubies.",
                },
                {
                  icon: <Calendar size={20} />,
                  title: "3 Month Crafting",
                  desc: "Meticulous hand-production process.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="p-3 bg-luxury-gold/10 text-luxury-gold rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 blur-[100px]" />

            <h3 className="text-2xl font-bold brand-font mb-8">
              Initiate Commission
            </h3>
            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">
                    Your Vision Name
                  </label>
                  <input
                    required
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-luxury-gold"
                    placeholder="e.g. Wedding Legacy 2024"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">
                      Full Name
                    </label>
                    <input
                      required
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">
                      Metal Choice
                    </label>
                    <select className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-luxury-gold appearance-none">
                      <option>22k Gold</option>
                      <option>Rose Gold</option>
                      <option>Platinum</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">
                    Inspiration Details
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-luxury-gold"
                    placeholder="Describe the spirit of your piece..."
                  />
                </div>
                <button className="w-full bg-luxury-gold text-black font-bold py-5 rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all">
                  REQUEST CONSULTATION
                </button>
              </form>
            ) : (
              <div className="text-center py-20 space-y-6">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles size={40} />
                </div>
                <h4 className="text-2xl font-bold brand-font">
                  Commission Received
                </h4>
                <p className="text-white/40">
                  A lead designer will contact you within 48 hours to begin the
                  sketch process.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Design Background Section */}
        <section className="mt-32 rounded-[4rem] overflow-hidden relative h-[500px]">
          <img
            src="/images/sketch.png"
            className="w-full h-full object-cover"
            alt="Design Process"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-deep-black/60 to-transparent flex items-center px-12 md:px-20">
            <div className="max-w-lg">
              <h2 className="text-4xl font-bold brand-font mb-6">
                Traditional Drafting
              </h2>
              <p className="text-white/80 leading-relaxed">
                Every bespoke commission begins on paper. We maintain the
                ancient tradition of hand-drafting to ensure every
                micro-filigree detail is perfection before we touch the gold.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default BespokePage;
