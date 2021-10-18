interface DAO<T> {
  get(id: number): T;
  getAll(): T[];
  add(item: T): void;
  update(item: T): void;
  find(filterFunc: (item: T) => boolean): T[];
  delete(item: T): void;
}
