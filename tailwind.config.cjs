/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,md,mdx,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--accent))",
        secondary: "rgb(var(--accent-text))",
				component: "var(--component-bg)",
      }
    }
  },
  plugins: []
}
