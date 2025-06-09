// export type mongooseProp = {
//   conn: object | null;
//   promise: Promise<any> | null;
// };

// export type globalProp = {
//   mongoose?: mongooseProp;
// };

export type Product = {
  image: string;
  title: string;
  price: string;
  description: string;
  _id: string;
};

export type ResponseProduct = {
  message: string;
  products: Product[];
  success: boolean;
  status: number;
};
