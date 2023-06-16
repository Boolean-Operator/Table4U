import Link from 'next/link';
import Price from '../../components/Price';
import { RestaurantCardType } from '../../page';
import { calculateReviewRatingAverage } from '../../../utils/calculateReviewRatings';
import Stars from '../../components/Stars';

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: RestaurantCardType;
}) {
  const stars = parseFloat(
    calculateReviewRatingAverage(restaurant.reviews).toFixed(1)
  );

  const renderRating = () => {
    if (stars > 4) return 'Excellent';
    else if (stars <= 4 && stars > 3) return 'Very Good';
    else if (stars <= 3 && stars > 0) return 'Good';
    else '';
  };

  return (
    <div className="bg-white border-b flex pb-5 ml-4">
      <img src={restaurant.main_image} alt="" className="w-44 h-36 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-sm">{renderRating()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
