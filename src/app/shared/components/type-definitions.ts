export type Callable = () => void;
export type Func<T, Y> = (item: T) => Y;
export type Predicate<T> = Func<T, boolean>;
