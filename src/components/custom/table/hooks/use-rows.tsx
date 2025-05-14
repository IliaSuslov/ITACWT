import { useCallback, ReactElement } from 'react';
import moment from 'moment';
import { isDateString } from '@/lib/utils';

export const useTableRows = () => {
  const formatCellValue = useCallback(
    (value: unknown, columnHeader: string): string | ReactElement => {
      if (value === null || value === undefined) return '—';

      const columnLower = columnHeader.toLowerCase();

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
          <div>
            {Object.entries(value).map(([key, val]) => (
              <p key={key}>
                {key}: {JSON.stringify(val)}
              </p>
            ))}
          </div>
        );
      }

      if (typeof value === 'string' && isDateString(value)) {
        try {
          return moment(value).format('DD/MM/YYYY, HH:mm');
        } catch {
          return 'Invalid date';
        }
      }

      if (columnLower === 'active') {
        return value ? 'Active' : 'Inactive';
      }

      return String(value);
    },
    [],
  );

  return { formatCellValue };
};
