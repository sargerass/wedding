import axios, { AxiosResponse } from "axios";
import { HttpAPI } from "../http.api";
import { IMessage } from "../intrefaces";

export class LogService {
  private static instance: LogService;

  public static getInstance(): LogService {
    if (!LogService.instance) {
      LogService.instance = new LogService();
    }

    return LogService.instance;
  }
  public register(event: string, additional?: string): Promise<AxiosResponse<void>> {
    const data = new FormData();
    let user = sessionStorage.getItem("user");
    user = user ? user : "0";
    data.append("event", event);
    data.append("user", user);
    
    additional && data.append("additional", additional);
    console.log('save esto', user, event);
    
    return axios.post(HttpAPI.message, data);
  }
}
