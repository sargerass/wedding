import { IImage } from "./image";

export interface IGuest {
  id: number;
  firstname: string;
  lastname: string;
  document: string;
  idImage: number;
  linkImage: string;
  image?: IImage;
}