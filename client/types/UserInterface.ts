export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  profileImagePath: string;
  friends: string;
  isAdmin: boolean;
  isSuperUser: boolean;
  token: string;
  isVerified: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}
