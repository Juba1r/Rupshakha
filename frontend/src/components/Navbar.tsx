"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  ShieldAlert,
  Search,
  Heart,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, user, logout } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Bangles", href: "/products" },
    { name: "Collections", href: "/collections" },
    { name: "Bespoke", href: "/bespoke" },
    { name: "Gift Guide", href: "/gifts" },
    { name: "Our Story", href: "/about" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "glass-panel py-3 m-2 w-[calc(100%-1rem)]" : "py-6"}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-12">
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold gold-gradient brand-font tracking-widest"
            >
              RUPSHAKHA
            </Link>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/60 hover:text-luxury-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:text-luxury-gold transition-colors"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              <Link
                href="/wishlist"
                className="hover:text-luxury-gold transition-colors"
              >
                <Heart size={20} strokeWidth={1.5} />
              </Link>

              <Link
                href="/cart"
                className="relative hover:text-luxury-gold transition-colors"
              >
                <ShoppingCart size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-luxury-gold text-black text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="h-4 w-[1px] bg-white/10 mx-2" />

              {user ? (
                <div className="flex items-center space-x-4">
                  {user.role === "admin" && (
                    <Link
                      href="/admin/dashboard"
                      className="text-luxury-gold hover:scale-110 transition-transform"
                      title="Admin Panel"
                    >
                      <ShieldAlert size={20} />
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    className="hover:text-luxury-gold transition-colors"
                  >
                    <User size={20} strokeWidth={1.5} />
                  </Link>
                  <button
                    onClick={logout}
                    className="hover:text-red-500 transition-colors"
                  >
                    <LogOut size={18} strokeWidth={1.5} />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-[11px] uppercase tracking-widest font-bold hover:text-luxury-gold transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-luxury-gold"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full glass-panel border-x-0 border-b-0 py-8 px-6"
            >
              <div className="container mx-auto flex items-center">
                <Search className="text-white/20 mr-4" size={24} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for celestial bangles..."
                  className="flex-1 bg-transparent border-none outline-none text-2xl brand-font placeholder:text-white/10"
                />
                <button onClick={() => setIsSearchOpen(false)}>
                  <X size={24} className="text-white/40 hover:text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu Overlay - OUTSIDE of nav to avoid containing block issues */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-deep-black z-[100] flex flex-col md:hidden"
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-white/5">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold gold-gradient brand-font tracking-widest"
              >
                RUPSHAKHA
              </Link>
              <button
                className="text-luxury-gold"
                onClick={() => setIsOpen(false)}
              >
                <X size={28} />
              </button>
            </div>

            {/* Menu Links */}
            <div
              className="flex-1 overflow-y-auto p-10 flex flex-col no-scrollbar"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
              <div className="space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-3xl brand-font border-b border-white/5 pb-4 last:border-0"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Menu Bottom Actions */}
              <div className="mt-auto pt-8 border-t border-white/5 space-y-8">
                <div className="flex justify-between items-center text-white/60">
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3"
                  >
                    <ShoppingCart size={20} />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                      Bag ({cartCount})
                    </span>
                  </Link>
                  <Link href="/wishlist" onClick={() => setIsOpen(false)}>
                    <Heart size={20} />
                  </Link>
                </div>

                {user ? (
                  <div className="flex flex-col space-y-3">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="text-luxury-gold font-bold uppercase tracking-[0.2em] text-[10px]"
                    >
                      Personal Vault
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px]"
                      >
                        Admin Command
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="text-red-500 text-left uppercase tracking-[0.2em] text-[10px] font-bold"
                    >
                      End Session
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block bg-luxury-gold text-black text-center py-4 rounded-xl font-bold tracking-[0.2em] text-xs shadow-lg"
                  >
                    SIGN IN
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Navbar;
