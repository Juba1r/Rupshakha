"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Image as ImageIcon,
  X,
  Upload,
} from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products.php");
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin-add-product.php", newProduct);
      if (response.data.success) {
        fetchProducts();
        setShowModal(false);
        setNewProduct({ name: "", price: "", image: "", description: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to remove this piece from the vault?"))
      return;
    try {
      const response = await api.post("/admin-delete-product.php", { id });
      if (response.data.success) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading Vault...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold brand-font mb-2">
            Inventory Vault
          </h1>
          <p className="text-white/40">Manage your luxury bangle catalog.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-luxury-gold text-black px-6 py-3 rounded-full font-bold flex items-center space-x-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
        >
          <Plus size={18} />
          <span className="text-sm">ADD NEW PIECE</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="glass-panel group relative overflow-hidden"
          >
            <div className="h-64 bg-white/5 flex items-center justify-center p-8">
              <img
                src={product.image}
                className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold mb-1 truncate">{product.name}</h3>
              <p className="text-luxury-gold font-bold mb-4">
                ${parseFloat(product.price).toFixed(2)}
              </p>

              <div className="flex justify-between">
                <button className="text-xs uppercase tracking-widest text-white/40 hover:text-white flex items-center">
                  <Edit3 size={14} className="mr-2" /> EDIT
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="text-xs uppercase tracking-widest text-red-500/60 hover:text-red-500 flex items-center"
                >
                  <Trash2 size={14} className="mr-2" /> REMOVE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-panel w-full max-w-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-2xl font-bold brand-font">
                  Refine New Masterpiece
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/40 hover:text-white"
                >
                  <X />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">
                      Product Name
                    </label>
                    <input
                      required
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-luxury-gold transition-colors"
                      placeholder="e.g. Celestial Orbit Bangle"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">
                      Price (USD)
                    </label>
                    <input
                      required
                      type="number"
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-luxury-gold transition-colors"
                      placeholder="2500"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">
                    Image Path
                  </label>
                  <div className="flex space-x-4">
                    <input
                      required
                      className="flex-1 bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-luxury-gold transition-colors"
                      placeholder="/images/bangle1.png"
                      value={newProduct.image}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, image: e.target.value })
                      }
                    />
                    <div className="w-14 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                      {newProduct.image ? (
                        <img
                          src={newProduct.image}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <ImageIcon size={20} className="text-white/20" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-luxury-gold transition-colors"
                    placeholder="The soul of Bengali heritage, refined for the modern global woman..."
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-luxury-gold text-black font-bold py-5 rounded-xl mt-6 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                >
                  ADD TO VAULT
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
