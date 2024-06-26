import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(200%)', opacity: "0" },
          '100%': { transform: 'translateX(0px)', opacity: "1" },
        }
      },
      animation: {
        slide: 'slide 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
};
export default config;
