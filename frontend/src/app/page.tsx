"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/lib/api";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await api.get("/products.php");
        if (response.data.success) {
          setFeaturedProducts(response.data.data.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Featured Section */}
      <section className="py-24 bg-deep-black overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold brand-font mb-4"
              >
                Signature Pieces
              </motion.h2>
              <p className="text-white/40">
                Handpicked elegance for your unique style.
              </p>
            </div>
            <Link
              href="/products"
              className="text-luxury-gold hover:underline font-bold tracking-widest hidden md:block"
            >
              VIEW ALL COLLECTIONS
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group relative glass-panel p-4 hover-lift"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="h-96 w-full bg-white/5 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-40 h-40 object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm">
                        VIEW PIECE
                      </button>
                    </div>
                  </div>
                </Link>
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-luxury-gold font-bold">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-luxury-gold/5" />
        <div className="container mx-auto px-6 relative text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl font-bold brand-font mb-8">
              The Rupshakha Legacy
            </h2>
            <p className="text-xl text-white/60 leading-relaxed mb-12 italic">
              "We believe that a bangle is not just jewelry, but a circle of
              destiny. Every curve we craft carries the soul of Bengali
              heritage, refined for the modern global woman."
            </p>
            <div className="h-[1px] w-24 bg-luxury-gold mx-auto" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
