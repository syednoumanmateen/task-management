import { DataStorageService } from "./../../providers/data-storage.service";
import { UserService } from "./../../providers/user.service";
import { Router } from "@angular/router";
import { AuthService } from "./../../providers/auth.service";

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AppService } from "src/app/providers/app.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private appService: AppService,
    private user: UserService,
    private router: Router,
    private storage: DataStorageService,
    private toastr: ToastrService
  ) {
    this.appService.pageTitle = "Login - Task Management";
    this.formGroup = this.getFormGroup();
  }

  ngOnInit(): void {}

  getFormGroup() {
    let fg = new FormGroup({
      userName: new FormControl(""),
      password: new FormControl(""),
      rememberMe: new FormControl(""),
    });
    return fg;
  }

  ValidateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    if (!fg.userName.trim()) {
      msg = "Please Enter The Valid UserName";
    } else if (!fg.password.trim()) {
      msg = "Please Enter The Valid Password";
    } else {
      msg = "";
    }
    return {
      msg: msg,
      status: msg == "" ? true : false,
    };
  }

  OnLoginClick() {
    let v = this.ValidateForm();
    if (v.status == false) {
      this.toastr.error(v.msg);
    } else {
      this.getLogin();
    }
  }

  onFogetPassword() {
    this.router.navigate(["/forget-password"]);
  }

  getLogin() {
    let fg = this.formGroup.value;
    let p = {
      email: fg.userName,
      password: fg.password,
    };
    this.user.userLogin(p).subscribe(
      (res: any) => {
        this.toastr.success(res.status);
        this.storage.setToken(res.data.token);
        this.storage.setData("user", this.formGroup.value.userName);
        this.router.navigate(["/dashboard"]);
      },
      (err: any) => {
        this.toastr.error(err.meassage);
      }
    );
  }
}
