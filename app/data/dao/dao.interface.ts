interface DAO<T> {
  get(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  add(item: T): Promise<void>;
  update(item: T): Promise<void>;
  delete(item: T): Promise<void>;
}

export default DAO;
