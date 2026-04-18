// Node.js 22+ ships a stub `localStorage` global that has no `getItem`/`setItem`
// (it requires --localstorage-file to actually work). This breaks Next.js SSR
// because the stub is defined (not undefined), so browser-guard patterns like
// `typeof localStorage !== 'undefined'` pass on the server.
//
// This instrumentation hook runs before any pages render and removes the stub,
// so server-side code never sees a non-functional localStorage object.
export async function register() {
  if (typeof globalThis.localStorage !== "undefined") {
    try {
      globalThis.localStorage.getItem("__test__");
    } catch {
      // The stub exists but doesn't work — remove it so SSR behaves correctly
      delete (globalThis as Record<string, unknown>).localStorage;
      delete (globalThis as Record<string, unknown>).sessionStorage;
    }
  }
}
