import axios from "axios";
import { HttpAPI } from "../http.api";
import { IGuest } from "../intrefaces";

export class GuestService {
  private static instance: GuestService;
  public static getInstance(): GuestService {
    if (!GuestService.instance) {
      GuestService.instance = new GuestService();
    }

    return GuestService.instance;
  }
  public validateDocument(document:string): Promise<IGuest> {
    const url = `${HttpAPI.guest}/${document}`;
    return axios.get(url);
  }
}