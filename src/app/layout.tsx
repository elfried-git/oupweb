import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oupweb",
  description: "Oupweb - A modern, feature-rich application for Playwright automation testing. Built with Next.js, TypeScript, and shadcn/ui.",
  keywords: ["Oupweb", "Dashboard", "Playwright", "Testing", "Next.js", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Oupweb Team" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>",
  },
  openGraph: {
    title: "Oupweb",
    description: "A modern, feature-rich application for Playwright automation testing",
    siteName: "Oupweb",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.add('dark');
                document.documentElement.style.backgroundColor = '#0F172A';
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html {
                background-color: #0F172A !important;
              }
              html, body {
                background: 
                  radial-gradient(ellipse 100% 80% at 50% -30%, rgba(255, 122, 92, 0.08), transparent),
                  radial-gradient(ellipse 80% 60% at 100% 100%, rgba(56, 189, 248, 0.05), transparent),
                  radial-gradient(ellipse 60% 50% at 0% 80%, rgba(52, 211, 153, 0.05), transparent),
                  linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%) !important;
                background-attachment: fixed !important;
                color-scheme: dark;
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
