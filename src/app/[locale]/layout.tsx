import "./globals.css";
import React from "react";
import { Nunito } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata = {
  title: "Learn Lenguages Online",
  description: "Website where you can learn any language you want for free.",
};

const nunito = Nunito({
  subsets: ["latin"],
});

interface props {
  children: React.ReactNode;
  params: { locale: "en" | "es" | "jp" };
}

export default async function RootLayout({
  children,
  params: { locale },
}: props) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-theme="autumn"
      className={nunito.className + " antialiased"}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
