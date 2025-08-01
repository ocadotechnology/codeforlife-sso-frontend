import path from "path"

import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      codeforlife: path.resolve(__dirname, "./node_modules/codeforlife/src"),
    },
  },
  envDir: "env",
  server: {
    open: true,
    host: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["html", "cobertura"],
    },
  },
  optimizeDeps: {
    // TODO: investigate which of these are needed
    include: [
      "@mui/x-date-pickers",
      "@mui/x-date-pickers/AdapterDayjs",
      "dayjs",
      "dayjs/locale/en-gb",
      "@mui/icons-material",
      "yup",
      "formik",
    ],
  },
})
