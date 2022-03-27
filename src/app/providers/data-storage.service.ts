import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  Data: String;
  constructor() {
    this.Data = "";
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

  setData(key: any, Data: string) {
    this.Data = Data;
  }
  getData(key: any) {
    return this.Data;
  }

  clearData() {}
}
