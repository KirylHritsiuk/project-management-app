import { SerializedError } from '@reduxjs/toolkit';

export function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === 'object' && error !== null && 'message' in error;
}
