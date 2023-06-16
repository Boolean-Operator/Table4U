import RestaurantCard from './components/RestaurantCard';
import Header from './components/Header';
import SearchSidebar from './components/SearchSidebar';
import { RestaurantCardType } from '../page';
import prisma from '../../utils/prisma';
import { Cuisine, Location, PRICE } from '@prisma/client';
import Reviews from '../restaurant/[slug]/components/Reviews';

export const metadata = {
  title: 'Search',
};

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const fetchRestaurantBySearch = (searchParams: SearchParams) => {
  console.log(searchParams);
  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: true,
    slug: true,
    location: true,
    price: true,
    reviews: true,
  };

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = async (): Promise<Location[]> => {
  return await prisma.location.findMany();
};

const fetchCuisines = async (): Promise<Cuisine[]> => {
  return await prisma.cuisine.findMany();
};

export default async function Search({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  const city = searchParams.city;
  const restaurants = await fetchRestaurantBySearch(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar
          cuisines={cuisines}
          locations={locations}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            <>
              {restaurants.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              ))}
            </>
          ) : (
            <p>Sorry, no restaurants in this area</p>
          )}
        </div>
      </div>
    </>
  );
}
