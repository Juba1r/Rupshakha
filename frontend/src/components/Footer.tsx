import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-deep-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold gold-gradient brand-font mb-6">
            RUPSHAKHA
          </h2>
          <p className="text-white/60 leading-relaxed">
            Crafting elegance since 1995. Premium Bangladeshi bangles for those
            who appreciate the finer circles of life.
          </p>
        </div>

        <div>
          <h3 className="text-luxury-gold font-semibold mb-6">Shop</h3>
          <ul className="space-y-4 text-white/60">
            <li>
              <Link
                href="/products"
                className="hover:text-white transition-colors"
              >
                All Bangles
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=gold"
                className="hover:text-white transition-colors"
              >
                Gold Collection
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=bridal"
                className="hover:text-white transition-colors"
              >
                Bridal Sets
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-luxury-gold font-semibold mb-6">Information</h3>
          <ul className="space-y-4 text-white/60">
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="hover:text-white transition-colors"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-luxury-gold font-semibold mb-6">Newsletter</h3>
          <p className="text-white/60 mb-4">
            Join our circle for exclusive updates.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email"
              className="bg-white/5 border border-white/10 px-4 py-2 w-full focus:outline-none focus:border-luxury-gold rounded-l"
            />
            <button className="bg-luxury-gold text-black px-4 py-2 rounded-r font-bold hover:bg-white transition-colors">
              JOIN
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-white/40 text-sm">
        &copy; {new Date().getFullYear()} Rupshakha Jewelry. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
