import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cockpit: {
          ink: "#17202a",
          surface: "#f7f8fa",
          line: "#d7dde5",
          accent: "#0f766e",
          warning: "#b45309",
        },
      },
    },
  },
  plugins: [],
};

export default config;
