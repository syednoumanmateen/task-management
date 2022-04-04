import { DataStorageService } from "./../../providers/data-storage.service";
import { UserService } from "./../../providers/user.service";
import { Router } from "@angular/router";

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
  loading:Boolean;
  constructor(
    private appService: AppService,
    private user: UserService,
    private router: Router,
    private storage: DataStorageService,
    private toastr: ToastrService
  ) {
    this.appService.pageTitle = "Login - Task Management";
    this.formGroup = this.getFormGroup();
    this.loading = false;
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

  onForgotPassword() {
    this.router.navigate(["/forgot-password"]);
  }

  getLogin() {
    let fg = this.formGroup.value;
    let p = {
      email: fg.userName || "",
      password: fg.password || "",
    };
    this.loading = true;
    this.user.userLogin(p).subscribe(
      (res: any) => {
        this.loading = false;
        this.toastr.success(res.status || "");
        this.storage.setToken("token", res.data.token);
        this.storage.setToken("userId", res.data.userId);
        this.router.navigate(["/dashboard"]);
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }
}
