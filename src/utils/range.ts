export function* range(count: number, shift = 0): IterableIterator<number> {
  for (let i = shift; i < count + shift; i++) {
    yield i;
  }
}
