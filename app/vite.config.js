import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [
    {
      name: "fix-ethers-import",
      resolveId(source) {
        if (source === "ethers") {
          return { id: "ethers", external: true };
        }
      },
    },
    react(), // Add any other plugins you may have
    nodeResolve(), // Add the nodeResolve plugin
    commonjs(), // Add the commonjs plugin
  ],
  build: {
    rollupOptions: {
      external: /^ethers($|\/)/,
      // external: ["ethers"],
    },
    output: {
      // Add the resolve option
      manualChunks: undefined,
    },
  },
});
