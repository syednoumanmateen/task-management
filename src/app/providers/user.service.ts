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

  editUser(id: any, params: any) {
    return this.ajax.put("/user/update/" + id, params);
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

  resetPassword(id: any, params: any) {
    return this.ajax.post("/user/reset-password/" + id, params);
  }

  addFeature(params: any) {
    return this.ajax.post("/feature/add/", params);
  }

  featureList() {
    return this.ajax.get("/feature/list/");
  }

  viewFeature(id: any) {
    return this.ajax.get("/feature/get/" + id);
  }

  editFeature(id: any, params: any) {
    return this.ajax.put("/feature/update/" + id, params);
  }

  deletFeature(id: any) {
    return this.ajax.delete("/feature/remove/" + id);
  }

  addRole(params: any) {
    return this.ajax.post("/role/add", params);
  }

  roleList() {
    return this.ajax.get("/role/list/");
  }

  viewRole(id: any) {
    return this.ajax.get("/role/get/" + id);
  }

  editRole(id: any, params: any) {
    return this.ajax.put("/role/update/" + id, params);
  }

  deletRole(id: any) {
    return this.ajax.delete("/role/remove/" + id);
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

  editProject(id: any, params: any) {
    return this.ajax.put("/project/update/" + id, params);
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

  addTask(params: any) {
    return this.ajax.post("/task/add/", params);
  }

  taskList() {
    return this.ajax.get("/task/list/");
  }

  viewTask(id: any) {
    return this.ajax.get("/task/get/" + id);
  }

  editTask(id: any, params: any) {
    return this.ajax.put("/task/update/" + id, params);
  }

  deleteTask(id: any) {
    return this.ajax.delete("/task/remove/" + id);
  }

  removeTask(id: any) {
    return this.ajax.put("/task                                                                                                                                                                                                                                                                                                                                                                                                                               /remove/" + id);
  }

}
