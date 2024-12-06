export interface IBike {
    name: string;
    brand: string;
    price: number;
    category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
    description: string;
    quantity: number;
    inStock: boolean;
    isDeleted: boolean;
}

export interface IError {
    message: string;
}
