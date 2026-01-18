import * as jose from "jose";

interface VerifyOptions {
  instanceHost?: string;
  publicHost?: string;
}

/**
 * Verify a JWT token using the JWKS endpoint
 */
export async function verifyJwt<T = Record<string, unknown>>(
  token: string,
  jwksUrl: string,
  _options?: VerifyOptions
): Promise<T> {
  const JWKS = jose.createRemoteJWKSet(new URL(jwksUrl));
  const { payload } = await jose.jwtVerify(token, JWKS);
  return payload as T;
}
