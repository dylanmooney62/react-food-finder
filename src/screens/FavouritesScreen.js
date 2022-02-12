import React, { useContext } from 'react';

import { FavouritesContext } from '../context/FavouritesContext';

import Container from '../components/Container';
import RestaurantList from '../components/RestaurantList';

const FavouritesScreen = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <Container>
      <RestaurantList restaurants={favourites} />
    </Container>
  );
};

export default FavouritesScreen;
