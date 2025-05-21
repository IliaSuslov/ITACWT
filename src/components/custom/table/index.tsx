import { TableBody, TableContainer, TableHeader } from './components';
import { useTableRows } from './hooks/use-rows';
import { ColumnConfig, TableData } from './types';

interface UniversalTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  className?: string;
  renderActions?: (row: T) => React.ReactNode;
}

export const Table = <T extends TableData>({
  data,
  columns,
  renderActions,
  className,
}: UniversalTableProps<T>) => {
  const { formatCellValue } = useTableRows();
  
  if (data.length === 0) {
    return <p>No data</p>;
  }

  return (
    <TableContainer className={className}>
      <table className="w-full p-2">
        <TableHeader columns={columns} />
        <TableBody
          data={data}
          columns={columns}
          formatCellValue={formatCellValue}
          renderActions={renderActions}
        />
      </table>
    </TableContainer>
  );
};
