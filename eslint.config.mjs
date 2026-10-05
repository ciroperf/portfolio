import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-plugin-react's version auto-detection is incompatible with ESLint 10.
  { settings: { react: { version: "19" } } },
  // Vendored React Bits sources are kept as published by the registry.
  globalIgnores([".next/**", "out/**", "next-env.d.ts", "components/reactbits/**"]),
]);
