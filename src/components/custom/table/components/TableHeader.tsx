import { cn } from '@/lib/utils';
import { ColumnConfig, TableData } from '../types';

interface TableHeaderProps<T extends TableData> {
  columns: ColumnConfig<T>[];
  className?: string;
}

export const TableHeader = <T extends TableData>({ columns, className }: TableHeaderProps<T>) => (
  <thead className="bg-slate-100">
    <tr>
      {columns.map((column) => (
        <th
          key={column.key as string}
          scope="col"
          className={cn(
            'px-6 py-3 text-left text-md font-bold text-gray-500 capitalize tracking-wider',
            className,
          )}
        >
          {column.header}
        </th>
      ))}
      <th />
    </tr>
  </thead>
);
