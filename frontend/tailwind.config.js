/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        quaternary: "var(--color-quaternary)",

        muted: "var(--color-muted)",

        "primary-text": "var(--color-primary-text)",
        "secondary-text": "var(--color-secondary-text)",

        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
      },
    },
  },
  plugins: [],
};
