"use client";

import { IntlProvider, NextIntlClientProvider } from "next-intl";
import { ComponentProps } from "react";

type ProviderProps = Omit<
  ComponentProps<typeof IntlProvider>,
  "locale" | "children"
> & {
  locale?: string;
  children: JSX.Element;
};

export default function ClientIntlProvider({
  locale,
  now,
  timeZone,
  messages,
  formats,
  children,
}: ProviderProps) {
  return (
    <NextIntlClientProvider
      onError={(error) => console.error(error)}
      getMessageFallback={({ namespace, key }) => `${namespace}.${key}`}
      locale={locale}
      now={now}
      timeZone={timeZone}
      messages={messages}
      formats={formats}
    >
      {children}
    </NextIntlClientProvider>
  );
}
