import { NextResponse } from "next/server";

// Force-redirect every HTTP request to HTTPS
function forceHTTPS(req) {
  // if (
  //   process.env.NODE_ENV === "production" &&
  // req.headers.get("x-forwarded-proto") !== "https" &&
  //   // This check prevents us from getting trapped in HTTPS localhost if we are
  //   // testing a production build locally via `next build && next start`; we
  //   // can use `req.headers.get('host')` to get the true host (e.g.
  //   // 'faithdashboard.com'), whereas `req.nextUrl.host` is always
  //   // 'localhost:3000'
  //   !req.headers?.get("host")?.includes("localhost")
  // ) {
  //   return NextResponse.redirect(`https://${req.headers.get("host")}${req.nextUrl.pathname}`, 301);
  // }
}

// Redirect every www request to the non-www equivalent
function redirectWwwToNonWww(req) {
  const host = req.headers.get("host") || "";
  const wwwRegex = /^www\./;
  if (wwwRegex.test(host) && !req.headers.get("host")?.includes("localhost")) {
    const newHost = host.replace(wwwRegex, "");
    return NextResponse.redirect(`https://${newHost}${req.nextUrl.pathname}`, 301);
  }
}

// Sequentially process an array of middleware functions (this function is to
// avoid repetition and produce cleaner code)
function processMiddlewareFunctions(req, middlewareFns) {
  for (const middlewareFn of middlewareFns) {
    const fnResponse = middlewareFn(req);
    if (fnResponse) {
      return fnResponse;
    }
  }
  return NextResponse.next();
}

export { forceHTTPS, redirectWwwToNonWww, processMiddlewareFunctions };
