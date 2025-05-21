import { useCallback, ReactElement } from 'react';
import moment from 'moment';
import { isDateString } from '@/lib/utils';

type CellFormatter = (value: unknown, columnHeader: string) => string | ReactElement | null;

const defaultFormatter: CellFormatter = (value) => {
  if (value === null || value === undefined) return '—';
  return String(value);
};

const dateFormatter: CellFormatter = (value) => {
  if (typeof value === 'string' && isDateString(value)) {
    try {
      return moment(value).format('DD/MM/YYYY, HH:mm');
    } catch {
      return 'Invalid date';
    }
  }
  return null;
};

const objectFormatter: CellFormatter = (value) => {
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
  return null;
};

const activeFormatter: CellFormatter = (value, columnHeader) => {
  if (columnHeader.toLowerCase() === 'active') {
    return value ? 'Active' : 'Inactive';
  }
  return null;
};

export const useTableRows = (
  formatters: CellFormatter[] = [dateFormatter, objectFormatter, activeFormatter, defaultFormatter],
) => {
  const formatCellValue = useCallback(
    (value: unknown, columnHeader: string): string | ReactElement => {
      for (const formatter of formatters) {
        const result = formatter(value, columnHeader);
        if (result !== null) return result;
      }
      return '—'; // fallback if no formatter returned a result
    },
    [formatters],
  );

  return { formatCellValue };
};
