import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  useFonts,
  OpenSans_700Bold,
  OpenSans_400Regular,
} from '@expo-google-fonts/open-sans';

import { LocationProvider } from './src/context/LocationContext';
import { RestaurantProvider } from './src/context/RestaurantContext';
import { FavouritesProvider } from './src/context/FavouritesContext';

import Navigation from './src/components/Navigation';

export default App = () => {
  const [fontsLoading] = useFonts({ OpenSans_700Bold, OpenSans_400Regular });

  if (!fontsLoading) {
    return <View></View>;
  }

  return (
    <LocationProvider>
      <RestaurantProvider>
        <FavouritesProvider>
          <PaperProvider>
            <StatusBar />
            <Navigation />
          </PaperProvider>
        </FavouritesProvider>
      </RestaurantProvider>
    </LocationProvider>
  );
};
