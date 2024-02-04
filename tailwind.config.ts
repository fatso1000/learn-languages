import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        showAndHide: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        autumn: {
          ...require("daisyui/src/theming/themes")["[data-theme=autumn]"],
          info: "#41ACBA",
          accent: "#6D0076"
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
export default config;
