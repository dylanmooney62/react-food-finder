import React, { createContext, useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Use GPS location when app loads
  useEffect(() => {
    setLocationGPS();
  }, [setLocationGPS]);

  const setLocationGPS = useCallback(async () => {
    setLoading(true);

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return setError('Background permissions denied');
    }

    const { coords } = await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = coords;

    setLocation({ latitude, longitude });
    setLoading(false);
  }, []);

  const setLocationGeocode = async (address) => {
    setLoading(true);

    const locations = await Location.geocodeAsync(address);

    if (locations.length === 0) {
      return setError('Could not retrieve coordinates from address');
    }

    const { latitude, longitude } = locations[0];

    setLocation({ latitude, longitude });
    setLoading(false);
  };

  return (
    <LocationContext.Provider
      value={{ location, loading, error, setLocationGeocode, setLocationGPS }}
    >
      {children}
    </LocationContext.Provider>
  );
};
