import React, { createContext, useContext, useState } from 'react';
import useAsyncEffect from 'use-async-effect';

import { LocationContext } from './LocationContext';
import { getRestaurants } from '../api/yelp';

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const { location } = useContext(LocationContext);

  // Fetch restaurants each time the location updates
  useAsyncEffect(async () => {
    if (!location) return;

    setLoading(true);

    const restaurants = await getRestaurants({
      lat: location.latitude,
      lng: location.longitude,
    });

    setRestaurants(restaurants);
    setLoading(false);
  }, [location]);

  return (
    <RestaurantContext.Provider value={{ restaurants, loading }}>
      {children}
    </RestaurantContext.Provider>
  );
};
