import React, { createContext, useState, useContext, useEffect } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('mercacuba_location');
    return saved ? JSON.parse(saved) : null;
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    if (location) {
      localStorage.setItem('mercacuba_location', JSON.stringify(location));
    }
  }, [location]);

  // Open modal if no location is set after a short delay
  useEffect(() => {
    if (!location) {
      const timer = setTimeout(() => {
        setIsLocationModalOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const changeLocation = (newLocation) => {
    setLocation(newLocation);
    setIsLocationModalOpen(false);
  };

  return (
    <ShopContext.Provider value={{ 
      location, 
      changeLocation, 
      isLocationModalOpen, 
      setIsLocationModalOpen 
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
