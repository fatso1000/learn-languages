import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        visibility: "fade-out 0s linear 0.33s",
      },
      keyframes: {
        "fade-out": {
          to: {
            display: "none",
            opacity: "0",
          },
        },

        showAndHide: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        bounce: {
          "0%": {
            transform: "translateY(-10%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
          "100%": {
            transform: "translateY(-10%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        glasspastel: {
          ...require("daisyui/src/theming/themes")["[data-theme=pastel]"],
          primary: "#ffc4d9",
          "primary-content": "#4a3040",
          secondary: "#bde0fe",
          "secondary-content": "#1e3a5f",
          accent: "#DBBBFF",
          "accent-content": "#3d2f52",
          neutral: "#c8b8d4",
          "neutral-content": "#3d3548",
          "base-100": "#fef8fb",
          "base-200": "#f3eef8",
          "base-300": "#e2dce8",
          "base-content": "#3d3548",
          info: "#a8dadc",
          "info-content": "#1d3557",
          success: "#d8f3dc",
          "success-content": "#1b4332",
          warning: "#ffe5b4",
          "warning-content": "#5c3d00",
          error: "#ffadad",
          "error-content": "#4a1515",
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
