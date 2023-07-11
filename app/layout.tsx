import NavBar from './components/NavBar';
import AuthContext from './context/AuthContext';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Table 4 U',
  description: 'Book a table at your favorite restaurant',
  keywords: ['Restaurant reservations, menu, reviews'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="bg-orange-300 min-h-screen w-screen">
          <AuthContext>
            <main className="max-w-screen-2xl m-auto">
              <NavBar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
