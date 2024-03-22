// electron.vite.config.ts
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { fileURLToPath } from "node:url";
import { resolve } from "path";
var __electron_vite_injected_dirname = "E:\\programming\\sh-kasir";
var __electron_vite_injected_import_meta_url = "file:///E:/programming/sh-kasir/electron.vite.config.ts";
var electron_vite_config_default = defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__electron_vite_injected_dirname, "electron/main/index.ts")
        }
      }
    },
    resolve: {
      alias: {
        find: "@lib",
        replacement: fileURLToPath(new URL("../../src/lib", __electron_vite_injected_import_meta_url))
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__electron_vite_injected_dirname, "electron/preload/index.ts")
        }
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    root: ".",
    build: {
      rollupOptions: {
        input: {
          index: resolve(__electron_vite_injected_dirname, "index.html")
        }
      }
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("src", __electron_vite_injected_import_meta_url))
        },
        {
          find: "@lib",
          replacement: fileURLToPath(new URL("src/lib", __electron_vite_injected_import_meta_url))
        },
        {
          find: "@assets",
          replacement: fileURLToPath(new URL("src/assets", __electron_vite_injected_import_meta_url))
        },
        {
          find: "@routes",
          replacement: fileURLToPath(new URL("src/routes", __electron_vite_injected_import_meta_url))
        },
        {
          find: "@components",
          replacement: fileURLToPath(new URL("src/lib/components", __electron_vite_injected_import_meta_url))
        },
        {
          find: "@store",
          replacement: fileURLToPath(new URL("src/lib/store", __electron_vite_injected_import_meta_url))
        }
      ]
    },
    plugins: [svelte()]
  }
});
export {
  electron_vite_config_default as default
};
