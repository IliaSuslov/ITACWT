import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { Modal } from '../../modal';
import { useModal } from '../../modal/hooks/use-modal';
import { TableData } from '../types';

interface TableActionsProps<T extends TableData> {
  rowData: T;
  onUpdate: (updatedData: Partial<T>) => void;
  restrictedStringsToEdit?: string[];
}

export const TableActions = <T extends TableData>({
  rowData,
  onUpdate,
  restrictedStringsToEdit,
}: TableActionsProps<T>): JSX.Element => {
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState<Partial<T>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...rowData });
    }
  }, [isOpen, rowData]);

  const handleSubmit = () => {
    onUpdate(formData);
    closeModal();
  };

  const handleChange = <K extends keyof T>(field: K, value: T[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Button size="sm" onClick={openModal}>
        Edit
      </Button>
      <Modal
        title="Edit Row"
        size="xl"
        isOpen={isOpen}
        onClose={closeModal}
        handleSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 p-4">
          {Object.entries(rowData).map(([key, value]) => {
            if (restrictedStringsToEdit?.includes(key)) return null;

            const typedKey = key as keyof T;
            const currentValue = formData[typedKey];

            if (typeof value === 'string') {
              return (
                <Input
                  key={key}
                  title={key}
                  value={String(currentValue ?? '')}
                  onChange={(e) => handleChange(typedKey, e.target.value as T[keyof T])}
                />
              );
            }

            if (typeof value === 'boolean') {
              return (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-sm font-semibold capitalize">{key}</label>
                  <Select
                    value={String(currentValue)}
                    onValueChange={(val) => handleChange(typedKey, (val === 'true') as T[keyof T])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">true</SelectItem>
                      <SelectItem value="false">false</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              );
            }

            return null;
          })}
        </div>
      </Modal>
    </>
  );
};
