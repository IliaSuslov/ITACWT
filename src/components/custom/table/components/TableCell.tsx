import { cn } from '@/lib/utils';

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}
export const TableCell = ({ children, className }: TableCellProps) => (
  <td className={cn(`px-6 py-4 whitespace-nowrap text-sm text-gray-500`, className)}>{children}</td>
);
