import { Table } from '@/components/custom/table';
import { createFileRoute } from '@tanstack/react-router';
import { useAppStore } from '@/store';
import { TableActions } from '@/components/custom/table/components';
import { TableFilters } from '@/components/custom/table-filters';
import { flattenArray } from '@/lib/utils';
import { useMemo } from 'react';
import { Product } from '@/store/types';

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { filteredData, filters, data, actions } = useAppStore((state) => state);

  const isFiltering =
    (filters.search && filters.search.trim() !== '') ||
    (filters.status && filters.status !== 'all');

  const products = isFiltering ? filteredData : data.products;

  const productsData = useMemo(() => flattenArray(products), [products]);

  return (
    <div className="flex flex-col w-full">
      <TableFilters dataset="products" />
      <Table<Product>
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'amount', header: 'Amount' },
          { key: 'size', header: 'Size' },
          { key: 'active', header: 'Active' },
          { key: 'createdAt', header: 'Created At' },
        ]}
        data={productsData as Product[]}
        renderActions={(row: Product) => (
          <TableActions
            rowData={row}
            onUpdate={(updated: Partial<Product>) => actions.update('products', row.id, updated)}
            restrictedStringsToEdit={['size', 'createdAt']}
          />
        )}
      />
    </div>
  );
}
