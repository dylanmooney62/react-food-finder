import { YELP_AUTH_TOKEN } from '@env';

const url = 'https://api.yelp.com/v3/businesses';
const headers = {
  Authorization: `Bearer ${YELP_AUTH_TOKEN}`,
};

export const getRestaurants = async ({ lat, lng }) => {
  try {
    const data = await fetch(
      `${url}/search?term=food&latitude=${lat}&longitude=${lng}&limit=5`,
      { headers }
    ).then((res) => res.json());

    return data?.businesses || [];
  } catch (error) {
    console.error(error);
  }
};

export const getRestaurantById = async (id) => {
  try {
    const restaurant = await fetch(`${url}/${id}`, { headers }).then((res) =>
      res.json()
    );

    return restaurant;
  } catch (error) {
    console.error(error);
  }
};
