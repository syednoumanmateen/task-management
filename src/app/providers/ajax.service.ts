import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AjaxService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:3000";
  }

  get(url: any, params?: any) {
    console.log("param === ", params);

    return this.http.get<any>(this.baseUrl + url, params);
  }

  post(url: any, params?: any) {
    return this.http.post(this.baseUrl + url, params);
  }

  put(url: any, params?: any) {
    return this.http.put<any>(this.baseUrl + url, params);
  }

  delete(url: any, params?: any) {
    return this.http.delete<any>(this.baseUrl + url, params);
  }
}
