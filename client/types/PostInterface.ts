import { IUser } from "./UserInterface";

export interface IPost {
  _id: string;
  user: IUser;
  content: string;
  postImage: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
