import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { Nunito } from "next/font/google";
import ClientIntlProvider from "src/components/IntlProvider";

export const metadata = {
  title: "Learn Lenguages Online",
  description: "Website where you can learn any language you want for free.",
};

const nunito = Nunito({
  subsets: ["latin"],
});

interface props {
  children: ReactNode;
  params: Promise<{ locale: "en" | "es" | "jp" }>;
}

export default async function RootLayout(props0: props) {
  const params = await props0.params;

  const { locale } = params;

  const { children } = props0;

  const messages = await getMessages();

  const timeZone = "America/Argentina/Buenos_Aires";

  return (
    <html
      lang={locale}
      data-theme="autumn"
      className={nunito.className + " antialiased"}
    >
      <body>
        <ClientIntlProvider
          timeZone={timeZone}
          locale={locale}
          messages={messages}
        >
          <main>{children}</main>
        </ClientIntlProvider>
      </body>
    </html>
  );
}
