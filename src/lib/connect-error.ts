/**
 * Compatibility layer for connect-rpc error handling
 * The @zitadel/client npm package doesn't export these directly
 */

export enum Code {
  OK = 0,
  Canceled = 1,
  Unknown = 2,
  InvalidArgument = 3,
  DeadlineExceeded = 4,
  NotFound = 5,
  AlreadyExists = 6,
  PermissionDenied = 7,
  ResourceExhausted = 8,
  FailedPrecondition = 9,
  Aborted = 10,
  OutOfRange = 11,
  Unimplemented = 12,
  Internal = 13,
  Unavailable = 14,
  DataLoss = 15,
  Unauthenticated = 16,
}

export class ConnectError extends Error {
  code: Code;
  rawMessage: string;
  details: unknown[];
  
  constructor(message: string, code: Code = Code.Unknown, details: unknown[] = []) {
    super(message);
    this.name = "ConnectError";
    this.code = code;
    this.rawMessage = message;
    this.details = details;
  }

  /**
   * Find error details matching a specific schema type
   * This is a simplified implementation that returns empty array
   * since the npm package doesn't include the full connect-rpc error details
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  findDetails<T>(_schema: any): T[] {
    // In the npm package version, we don't have access to the full error details
    // Return empty array to prevent breaking the code
    return [];
  }

  static from(error: unknown): ConnectError {
    if (error instanceof ConnectError) {
      return error;
    }
    if (error instanceof Error) {
      return new ConnectError(error.message);
    }
    return new ConnectError(String(error));
  }
}

/**
 * Check if an error is a ConnectError with a specific code
 */
export function isConnectError(error: unknown, code?: Code): error is ConnectError {
  if (!(error instanceof ConnectError)) {
    return false;
  }
  if (code !== undefined) {
    return error.code === code;
  }
  return true;
}
