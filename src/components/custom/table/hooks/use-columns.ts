import { useMemo } from 'react';
import { ColumnConfig, TableData } from '../types';

export const useTableColumns = <T extends TableData>(data: T[]): ColumnConfig<T>[] => {
  const autoColumns: ColumnConfig<T>[] = useMemo(() => {
    if (data.length === 0) return [];

    const dateFieldPatterns = [
      { regex: /(updated|modified)/i, header: 'Updated' },
      { regex: /(published|posted)/i, header: 'Published' },
      { regex: /(created|added)/i, header: 'Created' },
      { regex: /(removed|deleted)/i, header: 'Removed' },
    ];

    return Object.keys(data[0]).reduce((acc: ColumnConfig<T>[], key) => {
      const typedKey = key as keyof T;

      if (['id', '_id'].includes(key.toLowerCase())) return acc;

      const datePattern = dateFieldPatterns.find(p => p.regex.test(key));
      if (datePattern) {
        return [
          ...acc,
          {
            key: typedKey,
            header: datePattern.header
          }
        ];
      }

      return [
        ...acc,
        {
          key: typedKey,
          header: key
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^./, str => str.toUpperCase())
        }
      ];
    }, []);
  }, [data]);

  return autoColumns;
};