export interface IUserData {
  user: User;
}
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phonne: string;
  email: string;
  role: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
