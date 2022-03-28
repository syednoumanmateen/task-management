import { AjaxService } from "./ajax.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private ajax: AjaxService) {}

  userLogin(params: any) {
    return this.ajax.post("/user/login", params);
  }

  userLogout() {
    return this.ajax.get("/user/logout");
  }

  addUser(params: any) {
    return this.ajax.post("/user/add", params);
  }

  listUser() {
    return this.ajax.get("/user/list/");
  }

  viewUser(id: any) {
    return this.ajax.get("/user/get/" + id);
  }

  deleteUser(id: any) {
    return this.ajax.delete("/user/remove/" + id);
  }

  changePassword(params: any) {
    return this.ajax.post("/user/change-password/", params);
  }

  forgetPassword(params: any) {
    return this.ajax.post("/user/forget-password", params);
  }

  OTPValidation(params: any) {
    return this.ajax.post("/user/otp-validation", params);
  }

  resetPassword(url: any, params: any) {
    return this.ajax.post("/user/reset-password/" + url, params);
  }
}
