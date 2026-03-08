"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Feather, Shield, Heart, Award } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/boutique.png"
            className="w-full h-full object-cover grayscale"
            alt="Rupshakha Boutique"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-luxury-gold tracking-[0.4em] uppercase text-sm font-bold mb-6"
          >
            Since 1982
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-8xl font-bold brand-font mb-8"
          >
            Our Sacred <br /> <span className="gold-gradient">Heritage</span>
          </motion.h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-deep-black to-transparent" />
      </section>

      {/* The Story Section */}
      <section className="py-32 bg-deep-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold brand-font leading-tight">
                Crafting Circles of <br /> Destiny for Generations
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Rupshakha began as a small atelier in the heart of Dhaka, fueled
                by a single vision: to elevate the traditional Bengali bangle
                into a global icon of luxury. Every piece we create is a
                testament to the patient hands of our master artisans.
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                To us, jewelry is not an accessory—it is a vessel for history.
                We combine the soul of ancient filigree techniques with the
                geometric precision of modern design.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h4 className="text-3xl font-bold brand-font text-luxury-gold">
                    40+
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-white/40">
                    Years of Mastercraft
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold brand-font text-luxury-gold">
                    100k+
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-white/40">
                    Global Clients
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden glass-panel p-4"
            >
              <img
                src="/images/craft.png"
                className="w-full h-full object-cover rounded-2xl"
                alt="Craftsmanship"
              />
              <div className="absolute inset-0 bg-luxury-gold/10 mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              {
                icon: <Feather />,
                title: "Ethereal Design",
                desc: "Lightweight mastery in every curve.",
              },
              {
                icon: <Shield />,
                title: "Pure Gold",
                desc: "Certified 22k ethical gold sourcing.",
              },
              {
                icon: <Heart />,
                title: "Soulful Spirit",
                desc: "Each piece carries a blessing of heritage.",
              },
              {
                icon: <Award />,
                title: "Lifetime Trust",
                desc: "A legacy that lasts forever.",
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white/5 rounded-3xl border border-white/5"
              >
                <div className="w-16 h-16 bg-luxury-gold/10 text-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
