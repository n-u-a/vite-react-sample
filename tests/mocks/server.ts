// tests/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/** Vitest で使うモックサーバー */
export const server = setupServer(...handlers);
