import { getRequestConfig } from "next-intl/server";

const locales = ["en", "es", "jp"];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as any)) {
    locale = locales[0];
  }

  return {
    locale,
    messages: (await import(`../dictionaries/${locale}.json`)).default,
  };
});
