import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: {
          DEFAULT: "#e30613"
        },
        yellow: {
          DEFAULT: "#ffed00"
        },
        black: {
          DEFAULT: "#575756"
        },
        blue: {
          DEFAULT: "#0069b4"
        }
      }
    }
  },
  plugins: [],
};
export default config;
