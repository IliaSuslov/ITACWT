export type TableData = {
  id: number;
  [key: string]: unknown;
};

export interface ColumnConfig<T> {
  key: keyof T;
  header: string;
}
