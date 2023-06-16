import { PRICE } from '@prisma/client';

export default function Price({ price }: { price: PRICE }) {
  const renderPrice = () => {
    if (price === PRICE.INEXPENSIVE) {
      return (
        <>
          <span>$</span>
          <span className="text-gray-400">$$$</span>
        </>
      );
    } else if (price === PRICE.MODERATE) {
      return (
        <>
          <span>$$</span>
          <span className="text-gray-400">$$</span>
        </>
      );
    } else if (price === PRICE.EXPENSIVE) {
      return (
        <>
          <span>$$$</span>
          <span className="text-gray-400">$</span>
        </>
      );
    } else if (price === PRICE.VERY_EXPENSIVE) {
      return (
        <>
          <span>$$$$</span>
        </>
      );
    } else {
      return (
        <>
          <span>????</span>
        </>
      );
    }
  };
  return <p className="mr-3">{renderPrice()}</p>;
}
