import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // Additional Configuration Options
  server: {
    port: 80,
    open: true,
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Additional build options
  },
});
