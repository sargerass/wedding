import axios, { AxiosResponse } from "axios";
import { HttpAPI } from "../http.api";
import { IMessage } from "../intrefaces";

export class MessageService {
  private static instance: MessageService;

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }

    return MessageService.instance;
  }
  public register(data: FormData): Promise<AxiosResponse<void>> {
    return axios.post(HttpAPI.message, data);
  }
  public getAll(id: number): Promise<IMessage[]> {
    const url = `${HttpAPI.message}/${id}`;
    return axios.get(url);
  }
}