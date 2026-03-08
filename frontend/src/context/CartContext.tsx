"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

interface CartItem {
  cart_id?: number;
  id: number;
  name: string;
  price: string | number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, quantity?: number) => Promise<void>;
  removeFromCart: (cartId: number) => Promise<void>;
  cartCount: number;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      if (!user) return;
      const response = await api.get(`/get-cart.php?user_id=${user.id}`);
      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  const addToCart = async (product: any, quantity: number = 1) => {
    if (!user) {
      // Guest cart logic if needed, but for now redirect or just show login
      alert("Please login to add items to your bag.");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await api.post("/add-to-cart.php", {
        user_id: user.id,
        product_id: product.id,
        quantity: quantity,
      });
      if (response.data.success) {
        fetchCart();
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  const removeFromCart = async (cartId: number) => {
    try {
      const response = await api.post("/remove-from-cart.php", {
        cart_id: cartId,
      });
      if (response.data.success) {
        setCart((prev) => prev.filter((item) => item.cart_id !== cartId));
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  };

  const login = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCart([]);
    window.location.href = "/";
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        cartCount,
        user,
        login,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
