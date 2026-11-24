import type { Problem } from '../models/api';

export const NETWORK_FAILURE = 0;

export class ApiError extends Error {
  readonly status: number;
  readonly problem: Problem | null;

  constructor(status: number, problem: Problem | null, cause?: unknown) {
    super(
      problem?.detail ??
        (status === NETWORK_FAILURE
          ? 'The server did not answer.'
          : `The server answered with the status ${status}.`),
      { cause },
    );
    this.name = 'ApiError';
    this.status = status;
    this.problem = problem;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

function isProblem(body: unknown): body is Problem {
  if (typeof body !== 'object' || body === null) {
    return false;
  }
  const fields = body as Record<string, unknown>;
  return typeof fields.code === 'string' && typeof fields.requestId === 'string';
}

async function readProblem(response: Response): Promise<Problem | null> {
  try {
    const body: unknown = await response.json();
    return isProblem(body) ? body : null;
  } catch {
    return null;
  }
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      ...init,
      headers: { Accept: 'application/json', ...init?.headers },
    });
  } catch (cause) {
    throw new ApiError(NETWORK_FAILURE, null, cause);
  }
  if (!response.ok) {
    throw new ApiError(response.status, await readProblem(response));
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}
