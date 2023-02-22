import { processMiddlewareFunctions, redirectWwwToNonWww, forceHTTPS } from "@utils/Middleware";

export function middleware(req) {
  return processMiddlewareFunctions(req, [forceHTTPS, redirectWwwToNonWww]);
}
