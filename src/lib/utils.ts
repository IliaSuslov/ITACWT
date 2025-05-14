import { clsx, type ClassValue } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isDateString(value: string): boolean {
  return moment(value, moment.ISO_8601, true).isValid();
}

export function flattenArray<T extends Record<string, unknown>>(array: T[]) {
  return array.map(obj => flattenObject(obj));
}

export function flattenObject(obj: Record<string, unknown>) {
  return Object.keys(obj).reduce((acc: Record<string, unknown>, key: string) => {
    const value = obj[key];

    if (value === null || value === undefined) {
      acc[key] = value;
      return acc;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const flattened = flattenObject(value as Record<string, unknown>);
      for (const [nestedKey, nestedValue] of Object.entries(flattened)) {
        acc[`${nestedKey}`] = nestedValue;
      }
    }
    else {
      acc[key] = value;
    }

    return acc;
  }, {});
}