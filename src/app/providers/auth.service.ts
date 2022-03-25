import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router) {}

  setToken(token: any) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  isLogOut() {
    localStorage.clear();
    if (this.getToken() == null) {
      this.router.navigate(["/login"]);
    }
  }

  login(userName: any, password: any) {
    if (userName == "syed" && password == "syedA1@@") {
      this.setToken("abcd");
      this.isLoggedIn();
      this.router.navigate(["/dashboard"]);
    } else {
      alert("Enter correct Credentials");
    }
  }
}
