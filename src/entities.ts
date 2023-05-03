export type Category = '' | 'Groceries' | 'Utilities' | 'Entertainment';

export interface Expense {
    description: string;
    amount: number;
    price: number;
    category: Category;
}