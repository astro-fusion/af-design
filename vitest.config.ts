import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["**/node_modules/**", "dist"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["**/node_modules/**", "dist", "**/*.test.{ts,tsx}"],
    },
  },
});
