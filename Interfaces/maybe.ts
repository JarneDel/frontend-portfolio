export type Maybe<T> = NonNullable<T> | undefined | null;

export function convertToMaybe<T extends unknown>(value: T): Maybe<T> {
  return value ?? undefined;
}
export function isMaybe<T extends unknown>(value: any): value is Maybe<T> {
  return value === undefined || value === null;
}