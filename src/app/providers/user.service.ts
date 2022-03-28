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

  editUser(url: any, params: any) {
    return this.ajax.put("/user/update/" + url, params);
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

  addFeature(params: any) {
    return this.ajax.post("/feature/add/", params);
  }

  featureList() {
    return this.ajax.get("/feature/list/");
  }

  viewFeature(url: any) {
    return this.ajax.get("/feature/get/" + url);
  }

  editFeature(url: any, params: any) {
    return this.ajax.put("/feature/update/" + url, params);
  }

  deletFeature(url: any, params: any) {
    return this.ajax.delete("/feature/remove/" + url, params);
  }

  addRole(params: any) {
    return this.ajax.post("/role/add", params);
  }

  roleList() {
    return this.ajax.get("/role/list");
  }

  viewRole(url: any) {
    return this.ajax.get("/role/get/" + url);
  }

  editRole(url: any, params: any) {
    return this.ajax.put("/role/update/" + url, params);
  }

  deletRole(url: any, params: any) {
    return this.ajax.delete("/role/remove/" + url, params);
  }
}
