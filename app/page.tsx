import prisma from '../utils/prisma';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';

import { Cuisine, Location, PRICE, Review } from '@prisma/client';

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  reviews: Review[];
}
// const prisma = new PrismaClient();

const fetchRestaurant = async (): Promise<RestaurantCardType[]> => {
  const restaurant = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      reviews: true,
    },
  });
  return restaurant;
};

export default async function Home() {
  const restaurants = await fetchRestaurant();
  console.log(restaurants);
  return (
    <>
      <main>
        <Header />
        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </main>
    </>
  );
}
