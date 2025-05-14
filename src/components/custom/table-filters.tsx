import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import { useAppStore } from '@/store';

export const TableFilters = ({ dataset }: { dataset: string }) => {
  const { filteredData, filters, actions } = useAppStore((state) => state);
  const [searchTerm, setSearchTerm] = useState<string>(filters.search || '');
  const [statusFilter, setStatusFilter] = useState<string>(filters.status || 'all');

  const isFilterDefault = searchTerm === '' && (statusFilter === '' || statusFilter === 'all');

  const handleApplyFilter = () => {
    actions.applyFilters({
      search: searchTerm,
      status: statusFilter,
      dataset,
    });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    actions.resetFilters();
  };

  return (
    <div className="flex justify-end w-full gap-4 pb-4">
      <div className="w-1/5">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-1/5">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleApplyFilter} disabled={isFilterDefault}>
          Filter
        </Button>

        <Button
          variant="destructive"
          onClick={handleResetFilters}
          disabled={!filteredData && isFilterDefault}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
