import { AjaxService } from "./ajax.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private ajax: AjaxService) {}
  // user
  userLogin(params: any) {
    return this.ajax.post("/user/login", params);
  }

  userLogout() {
    return this.ajax.get("/user/logout");
  }

  addUser(params: any) {
    return this.ajax.post("/user/add", params);
  }

  listUser(params: any) {
    return this.ajax.get("/user/list/", params);
  }

  listCountUser() {
    return this.ajax.get("/user/count");
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

  changePassword(id: any, params: any) {
    return this.ajax.post("/user/change-password/" + id, params);
  }

  forgetPassword(params: any) {
    console.log("triger");

    return this.ajax.post("/user/forget-password", params);
  }

  OTPValidation(params: any) {
    return this.ajax.post("/user/otp-validation", params);
  }

  resetPassword(id: any, params: any) {
    return this.ajax.post("/user/reset-password/" + id, params);
  }

  filterUser(params?: any) {
    return this.ajax.get("/user/filtered-list", params);
  }

  // feature
  addFeature(params: any) {
    return this.ajax.post("/feature/add/", params);
  }

  featureList(params: any) {
    return this.ajax.get("/feature/list/", params);
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

  featureCount() {
    return this.ajax.get("/feature/count");
  }

  filterFeature(params?: any) {
    return this.ajax.get("/feature/filter/", params);
  }

  // role
  addRole(params: any) {
    return this.ajax.post("/role/add", params);
  }

  roleList(params: any) {
    return this.ajax.get("/role/list/", params);
  }

  roleCountList() {
    return this.ajax.get("/role/count");
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

  filterRole(params?: any) {
    return this.ajax.get("/role/filter", params);
  }

  // project
  addProject(params: any) {
    return this.ajax.post("/project/add/", params);
  }

  projectList(params: any) {
    return this.ajax.get("/project/list/", params);
  }

  projectCountList() {
    return this.ajax.get("/project/count");
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

  filterProject(params?: any) {
    return this.ajax.get("/project/filtered-list", params);
  }
  // task
  addTask(id: any, params: any) {
    return this.ajax.post("/project/add-tasklist/" + id, params);
  }

  taskList(id: any) {
    return this.ajax.get("/project/tasklist/" + id);
  }

  taskCountList(id: any) {
    return this.ajax.get("/project/tasklist/count/" + id);
  }

  viewTask(id: any) {
    return this.ajax.get("/project/get-tasklist/" + id);
  }

  editTask(id: any, params: any) {
    return this.ajax.put("/project/update-tasklist/" + id, params);
  }

  deleteTask(id: any) {
    return this.ajax.delete("/project/remove-tasklist/" + id);
  }

  filterTask(id: any, params?: any) {
    return this.ajax.get("/project/filtered-tasklist/" + id, params);
  }

  countStatus(id: any) {
    return this.ajax.get("/project/status-task/" + id);
  }
  // comment
  addTaskComment(params: any) {
    return this.ajax.post("/project/add-taskComment/", params);
  }

  taskListComment() {
    return this.ajax.get("/project/taskComment/");
  }

  viewTaskComment(id: any) {
    return this.ajax.get("/project/get-taskComment/" + id);
  }

  editTaskComment(id: any, params: any) {
    return this.ajax.put("/project/update-taskComment/" + id, params);
  }

  deleteTaskComment(id: any) {
    return this.ajax.delete("/project/remove-taskComment/" + id);
  }

  filterTaskComment(params?: any) {
    return this.ajax.get("/project/filtered-taskComment/", params);
  }
}
