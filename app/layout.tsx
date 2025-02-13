import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik, Abel, Roboto } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const abel = Abel({
  variable: "--font-abel",
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
});


export const metadata: Metadata = {
  title: "Ruia Fabrics - Quality & Sustainable Fabrics",
  description: "Ruia Fabrics, established in 1952, specializes in high-quality, sustainable fabrics like LIVA eco-vera and luxurious micro velvet. With a legacy of excellence, we serve both domestic and international markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} ${abel.variable} ${roboto.variable} antialiased`}
        suppressHydrationWarning={false}
      >
       {children}
      </body>
    </html>
  );
}
