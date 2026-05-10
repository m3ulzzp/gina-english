import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
  },
  define: {
    'WORD_DATA': JSON.parse(fs.readFileSync(path.join(__dirname, 'dist', 'words.json'), 'utf-8')),
  },
});
