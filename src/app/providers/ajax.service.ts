import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AjaxService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:3000";
  }

  // get(url: any, params?: any) {
  //   return this.http.get<any>(this.baseUrl + url, params);
  // }

  post(url: any, params?: any) {
    return this.http.post(this.baseUrl + url, params);
  }

  put(url: any, params?: any) {
    return this.http.put<any>(this.baseUrl + url, params);
  }

  delete(url: any, params?: any) {
    return this.http.delete<any>(this.baseUrl + url, params);
  }

  get(url: any, params?: any) {
    let queryParams = new HttpParams({ fromObject: params });
    queryParams = queryParams.append("params", params);
    return this.http.get<any>(this.baseUrl + url, { params: queryParams });
  }

  getParams(url: any, params?: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("params", params);
    return this.http.get<any>(this.baseUrl + url, { params: queryParams });
  }
}
