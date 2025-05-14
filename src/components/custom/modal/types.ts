export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit?: () => void
    children: React.ReactNode;
    title?: string;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}