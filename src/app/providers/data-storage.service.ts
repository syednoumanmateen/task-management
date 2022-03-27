import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  token: String;
  constructor() {
    this.token = "";
  }

  setToken(token: string) {
    // this.token = token;
    localStorage.setItem("token", token);
  }
  getToken() {
    // return this.token;
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.clear();
  }
}
