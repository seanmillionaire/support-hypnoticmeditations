// Preserve the existing Pages Functions and tracking; only consolidate the support alias.
const SUPPORT_HOST = "support.hypnoticmeditations.ai";
const SUPPORT_PATHS = new Set([
  "/getting-started/first-session-guide/",
  "/getting-started/how-sessions-work/",
  "/getting-started/",
  "/getting-started/what-is-hypnotic-meditations/",
  "/getting-started/which-session-first/",
  "/",
  "/money/atm-vs-money-stack/",
  "/money/",
  "/money/money-blocks/",
  "/money/money-protocol/",
  "/money/money-sabotage/",
  "/money/reprogram-money-mindset/",
  "/money/scarcity-mindset/",
  "/policies-trust/about-methodology/",
  "/policies-trust/",
  "/policies-trust/refund-policy/",
  "/policies-trust/safety-disclosures/",
  "/programs/all-programs-overview/",
  "/programs/bundles-explained/",
  "/programs/complete-library-guide/",
  "/programs/guarantee-and-pricing/",
  "/programs/",
  "/purchase-access/billing-issues/",
  "/purchase-access/device-guide/",
  "/purchase-access/find-your-download/",
  "/purchase-access/",
  "/purchase-access/multiple-devices/",
  "/purchase-access/playback-issues/",
  "/rituals/daily-manifestation-ritual/",
  "/rituals/",
  "/rituals/manifestation-before-sleep/",
  "/rituals/ritual-sessions-guide/",
  "/sleep/3am-wakeups/",
  "/sleep/anxiety-at-night/",
  "/sleep/bedtime-overthinking/",
  "/sleep/cant-fall-asleep/",
  "/sleep/",
  "/sleep/racing-mind-at-night/",
  "/sleep/sleep-protocol/",
  "/sleep/sleep-reset-vs-sleep-stack/",
  "/sleep/sleep-session-guide/",
  "/stress-calm/calm-down-fast/",
  "/stress-calm/health-reset-guide/",
  "/stress-calm/",
  "/stress-calm/nervous-system-reset/",
  "/stress-calm/racing-thoughts-daytime/",
  "/stress-calm/stress-protocol/",
  "/stress-calm/stress-relief-at-work/"
]);

export function canonicalSupportUrl(input) {
  const url = new URL(input);
  const path = url.pathname.replace(/\/index\.html$/, "/");
  const directory = path.endsWith("/") ? path : path + "/";
  return SUPPORT_PATHS.has(directory) ? "https://" + SUPPORT_HOST + directory : null;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === "www." + SUPPORT_HOST) {
    url.protocol = "https:";
    url.hostname = SUPPORT_HOST;
    // 308 preserves the path, query string and method; the destination never redirects back.
    return Response.redirect(url.toString(), 308);
  }
  const response = await context.next();
  const canonical = canonicalSupportUrl(url);
  if (response.status !== 200 || !canonical ||
      !(response.headers.get("content-type") || "").toLowerCase().includes("text/html") ||
      context.request.method === "HEAD") return response;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("etag");
  const page = new Response(response.body, {status:response.status,statusText:response.statusText,headers});
  return new HTMLRewriter()
    .on('link[rel="canonical"]', {element(element) {element.remove();}})
    .on("head", {element(head) {
      head.append('<link rel="canonical" href="' + canonical + '">', {html:true});
    }})
    .transform(page);
}

