export type Product = {
  id: number;
  name: string;
  stream: string;
};

export type resProduct = {
  message: string;
  products: Product[];
  success: boolean;
  status: number;
};
