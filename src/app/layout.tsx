import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { SettingsProvider } from '@/context/SettingsContext';

export const metadata = {
  title: 'Vectra AI',
  description: 'AI Multi-Agent Trading System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-950 text-slate-100">
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}