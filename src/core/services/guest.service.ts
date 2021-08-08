import axios, { AxiosResponse } from "axios";
import { HttpAPI } from "../http.api";
import { IGuest } from "../intrefaces";

class GuestService {
  public validateDocument(document:string): Promise<AxiosResponse<IGuest>> {
    const url = `${HttpAPI.guest}/${document}`;
    return axios.get<IGuest>(url);
  }
}
const guestService = new GuestService();
export default guestService;