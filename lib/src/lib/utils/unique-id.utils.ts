let idCounter = 0;

/**
 * Generates a unique id, optionally with a prefix. The counter is shared over every call,
 * so two calls never return the same value inside one application instance.
 */
export function uniqueId(prefix = ''): string {
  return `${prefix}${++idCounter}`;
}
