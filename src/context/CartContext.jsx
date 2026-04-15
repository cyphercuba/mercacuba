import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  items: [], // { id, name, price, quantity, image }
  total: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let newItems;
      if (existingItemIndex > -1) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity || 1;
      } else {
        newItems = [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }
      return {
        ...state,
        items: newItems,
        total: state.total + (action.payload.price * (action.payload.quantity || 1))
      };
    }
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload.id);
      if (!itemToRemove) return state;
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        items: newItems,
        total: state.total - (itemToRemove.price * itemToRemove.quantity)
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity < 1) return state; // handled by REMOVE_ITEM if zero
      
      const newItems = state.items.map(item => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      });
      
      const newTotal = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        total: newTotal
      };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
