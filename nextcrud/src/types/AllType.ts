// export type mongooseProp = {
//   conn: object | null;
//   promise: Promise<any> | null;
// };

// export type globalProp = {
//   mongoose?: mongooseProp;
// };

export type Product = {
  title: number;
  price: string;
  description: string;
  _id : string;
};

export type resProduct = {
  message: string;
  products: Product[];
  success: boolean;
  status: number;
};
