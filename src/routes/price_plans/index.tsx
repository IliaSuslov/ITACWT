import { createFileRoute } from '@tanstack/react-router';
import { Table } from '@/components/custom/table';
import { useAppStore } from '@/store';
import { TableFilters } from '@/components/custom/table-filters';
import { TableActions } from '@/components/custom/table/components';
import { PricePlan } from '@/store/types';

export const Route = createFileRoute('/price_plans/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { filteredData, filters, data, actions } = useAppStore((state) => state);

  const isFiltering =
    (filters.search && filters.search.trim() !== '') ||
    (filters.status && filters.status !== 'all');

  const pricePlans = isFiltering ? filteredData : data.pricePlans;

  return (
    <div className="flex flex-col w-full">
      <TableFilters dataset="pricePlans" />
      <Table<PricePlan>
        data={pricePlans as PricePlan[]}
        renderActions={(row: PricePlan) => (
          <TableActions
            rowData={row}
            onUpdate={(updated) => actions.update('pricePlans', row.id, updated)}
            restrictedStringsToEdit={['createdAt', 'removedAt']}
          />
        )}
      />
    </div>
  );
}
