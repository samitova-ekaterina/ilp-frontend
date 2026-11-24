import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './api/openapi.json',
  output: './src/shared/models/api',
  plugins: ['@hey-api/typescript'],
});
