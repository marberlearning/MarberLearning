import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Marber Learning — Personalized K-12 Tutoring",
  description:
    "In-person tutoring for K-12 students. Certified tutors, personalized plans, and flexible scheduling. Book a free consultation today.",
  openGraph: {
    title: "Marber Learning — Personalized K-12 Tutoring",
    description:
      "In-person tutoring for K-12 students. Certified tutors, personalized plans, and flexible scheduling. Book a free consultation today.",
    type: "website",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
