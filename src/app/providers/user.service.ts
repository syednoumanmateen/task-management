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

  deletFeature(url: any) {
    return this.ajax.delete("/feature/remove/" + url);
  }

  addRole(params: any) {
    return this.ajax.post("/role/add", params);
  }

  roleList() {
    return this.ajax.get("/role/list/");
  }

  viewRole(url: any) {
    return this.ajax.get("/role/get/" + url);
  }

  editRole(url: any, params: any) {
    return this.ajax.put("/role/update/" + url, params);
  }

  deletRole(url: any) {
    return this.ajax.delete("/role/remove/" + url);
  }

  addProject(params: any) {
    return this.ajax.post("/project/add/", params);
  }

  projectList() {
    return this.ajax.get("/project/list/");
  }

  viewProject(id: any) {
    return this.ajax.get("/project/get/" + id);
  }

  editProject(id: any) {
    return this.ajax.get("/project/update/" + id);
  }

  deleteProject(id: any) {
    return this.ajax.delete("/project/remove/" + id);
  }

  removeProject(id: any) {
    return this.ajax.put("/project/remove/" + id);
  }
  filterUser(params?: any) {
    return this.ajax.getFilter("/user/filtered-list", params);
  }
}
