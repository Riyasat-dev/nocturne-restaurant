import { useState, useEffect } from 'react';
import { CartContext } from './CartContext';

const STORAGE_KEY = 'nocturne_cart_v1';

// Safe cart storage parser to prevent corrupt data crashes
function loadSavedCart() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter and sanitize items
    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        !isNaN(item.price) &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadSavedCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage quota or private mode safely handled
    }
  }, [items]);

  // Add dish to cart with specified quantity
  const addToCart = (dish, quantity = 1) => {
    if (!dish || !dish.id) return;
    const addQty = Math.max(1, Math.floor(quantity));

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === dish.id);
      if (existingIndex > -1) {
        const next = [...prevItems];
        const newQty = Math.min(99, next[existingIndex].quantity + addQty);
        next[existingIndex] = { ...next[existingIndex], quantity: newQty };
        return next;
      } else {
        return [
          ...prevItems,
          {
            id: dish.id,
            name: dish.name,
            price: dish.price,
            quantity: addQty,
            image: dish.image,
            category: dish.category,
            shortDescription: dish.shortDescription,
          },
        ];
      }
    });
  };

  // Update item quantity safely
  const updateQuantity = (dishId, newQty) => {
    const safeQty = Math.floor(newQty);
    if (safeQty <= 0) {
      removeFromCart(dishId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === dishId ? { ...item, quantity: Math.min(99, safeQty) } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (dishId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== dishId));
  };

  // Clear all items
  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.085; // 8.5% dining tax
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        itemCount,
        subtotal,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
