import { TableData } from "@/components/custom/table/types";

export interface Page extends TableData {
    id: number;
    title: string;
    active: boolean;
    updatedAt: string;
    publishedAt: string;
}

export interface PricePlan extends TableData {
    id: number;
    description: string;
    active: boolean;
    createdAt: string;
    removedAt: string;
}

export interface Product extends TableData {
    id: number;
    name: string;
    options: {
        size: string;
        amount: number;
    };
    active: boolean;
    createdAt: string;
}

interface StoreData {
    pages: Page[];
    pricePlans: PricePlan[];
    products: Product[];
}

export interface Store {
    data: StoreData;
    filteredData: Array<Page | PricePlan | Product>;
    filters: { search?: string, status?: 'all' | 'active' | 'inactive', dataset: keyof StoreData | '' };
    actions: {
        update: <K extends keyof StoreData>(
            dataSetKey: K,
            id: number,
            updated: Partial<StoreData[K][0]>
        ) => void;
        applyFilters: (filters: { search?: string, status?: 'all' | 'active' | 'inactive', dataset: keyof StoreData | '' }) => void;
        resetFilters: () => void;
    };
}