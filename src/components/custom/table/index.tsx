import { TableBody, TableContainer, TableHeader } from './components';
import { useTableColumns } from './hooks/use-columns';
import { useTableRows } from './hooks/use-rows';
import { ColumnConfig, TableData } from './types';

interface UniversalTableProps<T> {
  data: T[];
  columns?: ColumnConfig<T>[];
  className?: string;
  renderActions?: (row: T) => React.ReactNode;
}

export const Table = <T extends TableData>({
  data,
  columns,
  renderActions,
  className,
}: UniversalTableProps<T>) => {
  const autoColumns = useTableColumns<T>(data);
  const { formatCellValue } = useTableRows();
  const tableColumns = columns || autoColumns;

  if (data.length === 0) {
    return <p>No data</p>;
  }

  return (
    <TableContainer className={className}>
      <table className="w-full p-2">
        <TableHeader columns={tableColumns} />
        <TableBody
          data={data}
          columns={tableColumns}
          formatCellValue={formatCellValue}
          renderActions={renderActions}
        />
      </table>
    </TableContainer>
  );
};
