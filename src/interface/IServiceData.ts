export type IServiceType = ServiceList[];

interface ServiceList {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
