import LayoutComponent from "src/components/Layout";
import "./globals.css";
import React from "react";
import { Quicksand } from "next/font/google";

export const metadata = {
  title: "Matias Benitez Blog",
  description: "Generated by create next app",
};

const quicksand = Quicksand({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="autumn"
      className={quicksand.className + " antialiased"}
    >
      <body>
        <LayoutComponent>{children}</LayoutComponent>
      </body>
    </html>
  );
}
