/**
 * String utilities
 */
export class StringUtilities {
  /**
   * Returns true, if the given string is null or empty.
   */
  public static isEmpty(s: string | null | undefined): boolean {
    return s === null || s === undefined || `${s}`.length === 0;
  }
}
