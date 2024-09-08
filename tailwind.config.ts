import { Fira_Code } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["roboto-black"],
        Fira_Code: ["fira-code"]
      },
      colors: {
        eth: '#0077b6',
        sol: '#7209b7'
      }
    },
  },
  plugins: [],
};
export default config;
