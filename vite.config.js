import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Define environment variables
  define: {
    'process.env': process.env
  }
});
