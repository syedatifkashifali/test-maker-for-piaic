#!/usr/bin/env node
/**
 * Run the jsdom tests for the exam hall.
 *
 * `node --test` cannot load .tsx, so this boots Vite (JSX + the `@/` alias),
 * installs a jsdom window on the Node globals first — React DOM and zustand's
 * `window.localStorage` both need it at import time — and then loads the test
 * module, which registers its cases with node:test as usual.
 */
import { after } from "node:test";
import { JSDOM } from "jsdom";
import { createServer } from "vite";

const TEST_MODULE = "/src/components/hall/hall.dom.test.tsx";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
  pretendToBeVisual: true,
});

const { window } = dom;

const GLOBALS = [
  "window",
  "document",
  "HTMLElement",
  "HTMLInputElement",
  "Element",
  "Node",
  "Event",
  "CustomEvent",
  "MouseEvent",
  "KeyboardEvent",
  "getComputedStyle",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "localStorage",
  "DOMParser",
];

for (const key of GLOBALS) {
  const value = key === "window" ? window : window[key];
  if (value === undefined) continue;
  Object.defineProperty(globalThis, key, {
    value,
    writable: true,
    configurable: true,
  });
}

// navigator exists on Node 22 as a getter-only global; jsdom's is what React
// DOM's environment checks expect.
Object.defineProperty(globalThis, "navigator", {
  value: window.navigator,
  writable: true,
  configurable: true,
});

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const root = process.cwd();
const server = await createServer({
  configFile: false,
  root,
  resolve: { alias: { "@": `${root}/src` } },
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "warn",
});

// node:test runs the cases asynchronously after the module has been loaded, so
// teardown has to wait for the run to finish — closing the window early pulls
// `document` out from under tests that are still executing.
after(async () => {
  await server.close();
  window.close();
});

try {
  await server.ssrLoadModule(TEST_MODULE);
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
