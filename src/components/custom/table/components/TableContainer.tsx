import { cn } from '@/lib/utils';

interface TableContainerProps {
  children: React.ReactNode;
  className?: string;
}
export const TableContainer = ({ children, className }: TableContainerProps) => (
  <div className={cn('overflow-x-auto border rounded-md', className)}>{children}</div>
);
