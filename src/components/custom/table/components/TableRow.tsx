import { ReactElement } from 'react';
import { TableData, ColumnConfig } from '../types';
import { TableCell } from './TableCell';

interface TableRowProps<T extends TableData> {
  row: T;
  rowIndex: number;
  columns: ColumnConfig<T>[];
  formatCellValue: (value: unknown, columnHeader: string) => string | ReactElement;
  renderActions?: (row: T) => React.ReactNode;
}

export const TableRow = <T extends TableData>({
  row,
  rowIndex,
  columns,
  formatCellValue,
  renderActions,
}: TableRowProps<T>) => (
  <tr className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
    {columns.map((column) => (
      <TableCell className="w-full" key={`${rowIndex}-${String(column.key)}`}>
        {formatCellValue(row[column.key], String(column.key))}
      </TableCell>
    ))}
    {renderActions && <TableCell>{renderActions(row)}</TableCell>}
  </tr>
);
