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
        // Cyan Sky Blue untuk aksi utama (trust & tech)
        primary: {
          DEFAULT: '#0ea5e9', // sky-500
          hover: '#0284c7',   // sky-600
        },
        // Clear White mendominasi
        background: '#ffffff',
        surface: '#f8fafc',   // slate-50 untuk card
      },
    },
  },
  plugins: [],
};
export default config;