import { Context } from '@/app/api/types';
import { NextRequest } from 'next/server';

export function isNextRequest(thing: any): thing is NextRequest {
  return Boolean(thing?.nextUrl);
}

export function getOr<T>(
  request: URLSearchParams | NextRequest,
  key: string,
  mapper: (rawValue: string) => T,
  defaultValue?: T
): T | undefined;
export function getOr<T>(
  request: Context,
  key: keyof Context['params'],
  mapper: (rawValue: string) => T,
  defaultValue?: T
): T | undefined;
export function getOr<T>(
  request: URLSearchParams | NextRequest | Context,
  key: string | keyof Context['params'],
  mapper: (rawValue: string) => T,
  defaultValue?: T
): T | undefined {
  let rawValue: string | null = null;
  if (request instanceof URLSearchParams) {
    rawValue = request.get(key);
  } else if (isNextRequest(request)) {
    rawValue = request.nextUrl.searchParams.get(key);
  } else {
    rawValue = request.params[key];
  }

  if (rawValue) {
    return mapper(rawValue);
  }

  return defaultValue;
}

export function getOrAsNumber(
  request: URLSearchParams | NextRequest,
  key: string,
  defaultValue?: number
): number | undefined;
export function getOrAsNumber(
  request: Context,
  key: keyof Context['params'],
  defaultValue?: number
): number | undefined;
export function getOrAsNumber(
  request: URLSearchParams | NextRequest | Context,
  key: string | keyof Context['params'],
  defaultValue?: number
): number | undefined {
  if (request instanceof URLSearchParams || request instanceof NextRequest) {
    return getOr(request, key, Number, defaultValue);
  }

  return getOr(request, key, Number, defaultValue);
}
