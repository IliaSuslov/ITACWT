import { useEffect } from 'react';
import { ModalProps } from './types';
import { Button } from '@/components/ui/button';

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  size = 'md',
  handleSubmit,
}: ModalProps) => {
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  const onSubmit = () => {
    handleSubmit?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div
          className={`relative w-full transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all ${sizeClasses[size]}`}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="border-b p-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
            </div>
          )}

          <Button variant="outline" className="absolute right-4 top-2" onClick={onClose}>
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>

          <div className="p-4">{children}</div>

          <div className="border-t bg-gray-50 px-4 py-3 flex justify-end gap-2">
            <Button onClick={onSubmit}>Submit</Button>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
