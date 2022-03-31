import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  Data: any;
  constructor() {
    this.Data = {};
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.clear();
  }

  setData(key: any, Data: any) {
    this.Data[key] = Data;
  }
  getData(key: any) {
    return this.Data[key];
  }

  clearData(key: any) {
    this.Data[key] = {};
    return this.Data[key];
  }
}
