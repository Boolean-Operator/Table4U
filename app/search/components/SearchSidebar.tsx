import { Cuisine, Location, PRICE } from '@prisma/client';
import Link from 'next/link';

export default function Sidebar({
  cuisines,
  locations,
  searchParams,
}: {
  cuisines: Cuisine[];
  locations: Location[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  const prices = [
    {
      price: PRICE.INEXPENSIVE,
      label: '$',
      className: 'border w-full text-reg text-left font-light rounded-l p-2',
    },
    {
      price: PRICE.MODERATE,
      label: '$$',
      className: 'border w-full text-reg text-left font-light rounded-l p-2',
    },
    {
      price: PRICE.EXPENSIVE,
      label: '$$$',
      className: 'border w-full text-reg text-left font-light rounded-l p-2',
    },
    {
      price: PRICE.VERY_EXPENSIVE,
      label: '$$$$',
      className: 'border w-full text-reg text-left font-light rounded-l p-2',
    },
  ];
  return (
    <div className="w-1/5">
      <div className="border-b border-black pb-4 flex flex-col">
        <Link
          href={{
            pathname: '/search',
            query: {
              ...searchParams,
              city: '',
            },
          }}
          className="font-light text-reg capitalize"
          key={'location_reset'}
        >
          <h1 className="my-2 text-xl underline">Region</h1>
        </Link>
        {locations.map((location) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                city: location.name,
              },
            }}
            className="font-light text-reg capitalize"
            key={location.name}
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b border-black pb-4 flex flex-col">
        <Link
          href={{
            pathname: '/search',
            query: {
              ...searchParams,
              cuisine: '',
            },
          }}
          className="font-light text-reg capitalize"
          key={'cuisine_reset'}
        >
          <h1 className="my-2 text-xl underline">Cuisine</h1>
        </Link>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
            className="font-light text-reg capitalize"
            key={cuisine.id}
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <Link
          href={{
            pathname: '/search',
            query: {
              ...searchParams,
              price: '',
            },
          }}
        >
          <h1 className="my-2 text-xl underline">Price</h1>
        </Link>
        <div className="flex flex-col flex-start">
          {prices.map(({ price, label }) => (
            <Link
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  price,
                },
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
