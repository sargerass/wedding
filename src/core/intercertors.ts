import axios from "axios";

export class AppInterceptor {
  private static instance: AppInterceptor;

  public static getInstance(): AppInterceptor {
    if (!AppInterceptor.instance) {
      AppInterceptor.instance = new AppInterceptor();
    }

    return AppInterceptor.instance;
  }
  public init(): void {
    this._handleRequest();
    this._handleResponse();
  }
  private _handleResponse(): void {
    axios.interceptors.response.use(
      (response) => {
        
        return response.data || response ;
      },
      (error) => {
        console.log("error", error);
        const data = error?.response?.data || error;
        return Promise.reject(data);
      }
    );
  }
  private _handleRequest(): void {}
}