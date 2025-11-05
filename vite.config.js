import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"; // Import the new plugin
import react from '@vitejs/plugin-react' // Make sure to keep react

export default defineConfig({
  plugins: [
    react(), // Keep your react plugin
    tailwindcss(), // Add the new tailwind plugin
  ],
  base: "/p85/", // Example base path
  build:{
    outDir: "docs" // Example output directory
  }
});