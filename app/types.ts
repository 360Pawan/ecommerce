export interface Product {
  id: string;
  active: boolean;
  billing_scheme: string;
  currency: string;
  product: {
    id: string;
    description: string;
    images: string[];
    name: string;
    metadata: any;
  };
  unit_amount: number;
}


