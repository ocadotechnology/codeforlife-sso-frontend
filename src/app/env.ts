import env from "codeforlife/env"

export * from "codeforlife/env"

// Example of how to get an environment variable.
export const EXAMPLE = env.VITE_EXAMPLE ?? "DEFAULT_VALUE"
