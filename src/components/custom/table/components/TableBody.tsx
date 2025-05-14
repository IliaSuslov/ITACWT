import { cn } from '@/lib/utils';
import { TableData, ColumnConfig } from '../types';
import { TableRow } from './TableRow';
import { ReactElement } from 'react';

interface TableBodyProps<T extends TableData> {
  data: T[];
  columns: ColumnConfig<T>[];
  formatCellValue: (value: unknown, columnHeader: string) => string | ReactElement;
  renderActions?: (row: T) => React.ReactNode;
  className?: string;
}
export const TableBody = <T extends TableData>({
  data,
  columns,
  formatCellValue,
  renderActions,
  className,
}: TableBodyProps<T>) => (
  <tbody className={cn('bg-white divide-y divide-gray-200', className)}>
    {data.map((row, rowIndex) => (
      <TableRow<T>
        key={row.id}
        row={row}
        rowIndex={rowIndex}
        columns={columns}
        formatCellValue={formatCellValue}
        renderActions={renderActions}
      />
    ))}
  </tbody>
);
