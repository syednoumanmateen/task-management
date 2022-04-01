import { Router } from "@angular/router";
import { AppService } from "src/app/providers/app.service";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";
import { DataStorageService } from "src/app/providers/data-storage.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  curTab = "password";
  formGroup: FormGroup;
  userId: any;

  constructor(
    private userService: UserService,
    private appService: AppService,
    private toastr: ToastrService,
    private router: Router,
    private storage: DataStorageService
  ) {
    this.appService.pageTitle = "settings - Task Management";
    this.formGroup = this.getFormGroup();
  }

  ngOnInit(): void {
    this.userId = this.storage.getToken("userId");
    console.log(this.userId);
    
  }

  getFormGroup() {
    let fg = new FormGroup({
      currentpsw: new FormControl(""),
      newpsw: new FormControl(""),
      repeatnewpsw: new FormControl(""),
    });
    return fg;
  }

  validateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    if (!fg.newpsw.trim()) {
      msg = "Please Enter the New Password";
    } else if (!fg.repeatnewpsw.trim()) {
      msg = "Please Enter the Confirm Password";
    } else if (fg.repeatnewpsw.trim() !== fg.newpsw.trim()) {
      msg = "Enter the Password Does Not Match with Confirm Password";
    } else if (!fg.currentpsw.trim()) {
      msg = "Please Enter The Current correct Password";
    } else {
      msg = "";
    }
    return {
      msg: msg,
      status: msg == "" ? true : false,
    };
  }

  onSaveChanges() {
    let v = this.validateForm();
    if (v.status == false) {
      this.toastr.error(v.msg);
    } else {
      let p = {
        Password: this.formGroup.value.currentpsw || "",
        newPassword: this.formGroup.value.newpsw || "",
      };
      this.userService.changePassword(this.userId, p).subscribe(
        (res: any) => {
          this.toastr.success(res.message || "");
        },
        (err: any) => {
          this.toastr.error(err.error.message || "");
        }
      );
    }
  }

  onCancel() {
    this.formGroup.reset();
    this.router.navigate(["/dashboard"]);
  }
}
