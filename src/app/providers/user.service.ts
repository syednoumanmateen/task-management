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
}
