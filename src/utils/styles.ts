/**
 * Combines multiple class names into a single string
 * Can be done a number of ways, so for this challenge I'll ignore test coverage
 */
export function cls(...classNames: string[]): string {
  return classNames.join(' ')
}
