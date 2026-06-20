import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strong Arm Fitness Centre - Srinagar",
  description: "Transform your body, elevate your mind, join our community. Premier gym in Srinagar with state-of-the-art equipment, expert trainers, and wellness programs.",
  keywords: ["gym", "fitness", "srinagar", "personal training", "wellness"],
  openGraph: {
    title: "Strong Arm Fitness Centre",
    description: "Transform your body, elevate your mind, join our community",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        
        {/* Service Worker Cleanup - Using Next.js Script component */}
        <Script
          id="sw-cleanup"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                  registrations.forEach(sw => sw.unregister());
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}