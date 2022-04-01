import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  Data: any;
  constructor() {
    this.Data = {};
  }

  setToken(key:any,token: string) {
    localStorage.setItem(key, token);
  }
  getToken(key: any) {
    return localStorage.getItem(key);
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
