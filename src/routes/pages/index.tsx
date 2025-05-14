import { Table } from '@/components/custom/table';
import { createFileRoute } from '@tanstack/react-router';
import { TableFilters } from '@/components/custom/table-filters';
import { useAppStore } from '@/store';
import { TableActions } from '@/components/custom/table/components';
import { Page } from '@/store/types';

export const Route = createFileRoute('/pages/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { filteredData, filters, data, actions } = useAppStore((state) => state);

  const isFiltering =
    (filters.search && filters.search.trim() !== '') ||
    (filters.status && filters.status !== 'all');

  const pages = isFiltering ? filteredData : data.pages;

  return (
    <div className="flex flex-col w-full">
      <TableFilters dataset="pages" />
      <Table<Page>
        data={pages as Page[]}
        renderActions={(row: Page) => (
          <TableActions
            rowData={row}
            onUpdate={(updated) => actions.update('pages', row.id, updated)}
            restrictedStringsToEdit={['updatedAt', 'publishedAt']}
          />
        )}
      />
    </div>
  );
}
