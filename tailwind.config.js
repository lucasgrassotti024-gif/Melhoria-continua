/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dmaic: {
          define: '#2563eb',   // Azul
          measure: '#059669',  // Verde
          analyze: '#d97706',  // Âmbar / Laranja
          improve: '#7c3aed',  // Roxo
          control: '#dc2626',  // Vermelho
        }
      }
    },
  },
  plugins: [],
}
