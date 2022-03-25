import { Router } from "@angular/router";
import { AuthService } from "./../../providers/auth.service";

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AppService } from "src/app/providers/app.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private appService: AppService,
    private authService: AuthService,
    private router: Router
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
    let fg = this.formGroup.value;
    if (v.status == false) {
      alert(v.msg);
    } else {
      this.authService.login(fg.userName, fg.password);
    }
  }

  onFogetPassword() {
    this.router.navigate(["/forget-password"]);
  }
}
