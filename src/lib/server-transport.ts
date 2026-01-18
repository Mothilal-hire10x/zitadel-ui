import { createConnectTransport } from "@connectrpc/connect-web";
import { Interceptor } from "@connectrpc/connect";

/**
 * Create a bearer token interceptor
 */
function createBearerInterceptor(token: string): Interceptor {
  return (next) => async (req) => {
    req.header.set("Authorization", `Bearer ${token}`);
    return next(req);
  };
}

export interface ServerTransportOptions {
  baseUrl: string;
  instanceHost?: string;
  publicHost?: string;
}

/**
 * Create a server transport using Connect protocol (HTTP-based) instead of gRPC.
 * This is needed when the Zitadel instance doesn't support pure gRPC (HTTP/2).
 * 
 * NOTE: For self-hosted Zitadel, we do NOT send x-zitadel-instance-host or x-zitadel-public-host
 * headers because the external domain (Vercel) is not registered as a trusted domain.
 */
export function createHttpServerTransport(token: string, opts: ServerTransportOptions) {
  const interceptors: Interceptor[] = [createBearerInterceptor(token)];

  // Only add custom headers from CUSTOM_REQUEST_HEADERS environment variable
  // Do NOT send instanceHost/publicHost for self-hosted - it causes "domain not trusted" errors
  if (process.env.CUSTOM_REQUEST_HEADERS) {
    interceptors.push((next) => async (req) => {
      process.env.CUSTOM_REQUEST_HEADERS!.split(",").forEach((header) => {
        const kv = header.indexOf(":");
        if (kv > 0) {
          req.header.set(header.slice(0, kv).trim(), header.slice(kv + 1).trim());
        }
      });

      return next(req);
    });
  }

  return createConnectTransport({
    baseUrl: opts.baseUrl,
    interceptors,
    // Use fetch for HTTP-based transport (works in Node.js 18+)
    fetch: globalThis.fetch,
  });
}
