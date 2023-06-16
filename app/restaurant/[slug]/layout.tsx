import RestaurantPageHeader from '../[slug]/components/RestaurantPageHeader';
export const metadata = {
  description: 'Find and reserve a table at your favorite restaurant',
  keywords: ['Restaurant reservations, menu, reviews'],
  icons: '/fork.svg',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <main>
      <RestaurantPageHeader name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
}
