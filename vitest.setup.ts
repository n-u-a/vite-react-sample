// ./vitest.setup.ts
//--------------------------------------------------------------------
// 1) jest‑dom の matcher を expect に組み込む
//--------------------------------------------------------------------
// Vitest 用の薄いラッパー付きエントリーポイントを推奨。
// 旧来の `@testing-library/jest-dom` でも動きますが、型エラーが
// 出る場合はこちらを使うと安全です。
import "@testing-library/jest-dom/vitest";

//--------------------------------------------------------------------
// 2) fetch・TextEncoder/Decoder など jsdom に無い API を polyfill
//--------------------------------------------------------------------

// // fetch (whatwg-fetch は軽量で node18 以前でも使える)
// import "whatwg-fetch";

// // TextEncoder / TextDecoder（Vitest の node 環境によっては undefined）
// import { TextDecoder, TextEncoder } from "util";

// if (!globalThis.TextEncoder) {
//   globalThis.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
// }
// if (!globalThis.TextDecoder) {
//   globalThis.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;
// }

//--------------------------------------------------------------------
// 3) window.matchMedia のモック（Tailwind の useMediaQuery などがある場合）
//--------------------------------------------------------------------
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

//--------------------------------------------------------------------
// 4) MSW をユニットテストでも使いたい場合の雛形（任意）
//--------------------------------------------------------------------
// import { server } from './mocks/server';
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
