import prisma from '../../../../utils/prisma';
import RestaurantNavBar from '../components/RestaurantNavBar';
import Menu from './Menu';

const fetchRestaurantMenu = async (slug: string) => {
  const restaurantMenu = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });
  if (!restaurantMenu) {
    throw new Error();
  }

  return restaurantMenu.items;
};

export default async function RestaurantMenuPage({
  params,
}: {
  params: { slug: string };
}) {
  const menu = await fetchRestaurantMenu(params.slug);
  console.log(params);
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug} />
        <Menu menu={menu} />
      </div>
    </>
  );
}
