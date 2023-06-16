import Form from './components/Form';
import Header from './components/Header';
export const metadata = {
  title: 'Name',
};

export default function ReservationPage() {
  return (
    <>
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          <Header />
          <Form />
        </div>
      </div>
    </>
  );
}
