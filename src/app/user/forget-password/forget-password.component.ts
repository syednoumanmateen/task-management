import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from "src/app/providers/user.service";
import { AppService } from "src/app/providers/app.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ModalService } from "src/app/providers/modal.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"],
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChild("OTPModal") OTPModal!: ElementRef;
  @ViewChild("restPassword") restPassword!: ElementRef;
  formGroup: FormGroup;
  closeResult: string;
  otpGroup: FormGroup;
  resetGroup: FormGroup;
  loading: Boolean;
  constructor(
    private appService: AppService,
    private userService: UserService,
    private modalService: ModalService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.appService.pageTitle = "forgetPasswordser - Task Management";
    this.formGroup = this.getFormGroup();
    this.closeResult = "";
    this.otpGroup = this.getOTP();
    this.resetGroup = this.getresetPassword();
    this.loading = false;
  }

  ngOnInit(): void {}

  getFormGroup() {
    let fg = new FormGroup({
      email: new FormControl(""),
    });
    return fg;
  }
  getOTP() {
    let fg = new FormGroup({
      otp: new FormControl(""),
    });
    return fg;
  }
  getresetPassword() {
    let fg = new FormGroup({
      newpsw: new FormControl(""),
      repeatnewpsw: new FormControl(""),
    });
    return fg;
  }

  validateFormGroup() {
    let fg = this.formGroup.value;
    let msg = "";
    if (!fg.email.trim()) {
      msg = "Please Enter the Correct Email";
    } else {
      msg = "";
    }
    return {
      msg: msg,
      status: msg == "" ? true : false,
    };
  }
  validateOTP() {
    let fg = this.otpGroup.value;
    let msg = "";
    if (!fg.otp) {
      msg = "Please Enter the Correct OTP";
    } else {
      msg = "";
    }
    return {
      msg: msg,
      status: msg == "" ? true : false,
    };
  }
  validateResetPassword() {
    let fg = this.resetGroup.value;
    let msg = "";
    if (!fg.newpsw.trim()) {
      msg = "Please Enter the Password";
    } else if (!fg.repeatnewpsw.trim()) {
      msg = "Please Enter the Confirm Password";
    } else if (fg.repeatnewpsw.trim() !== fg.newpsw.trim()) {
      msg = "Enter the Password Does Not Match with Confirm Password";
    } else {
      msg = "";
    }
    return {
      msg: msg,
      status: msg == "" ? true : false,
    };
  }

  onSubmit() {
    let v = this.validateFormGroup();
    if (v.status == false) {
      this.toastr.error(v.msg);
    } else {
      let p = {
        email: this.formGroup.value.email,
      };
      this.loading = true;
      this.userService.forgetPassword(p).subscribe(
        (res: any) => {
          this.loading = false;
          this.modalService.open(this.OTPModal);
        },
        (err: any) => {
          this.loading = false;
          this.toastr.error(err.message);
        }
      );
    }
  }

  onOTPValidate() {
    let v = this.validateOTP();
    if (v.status == false) {
      this.toastr.error(v.msg);
    } else {
      let p = {
        code: this.otpGroup.value.otp || "",
      };
      this.loading = true;
      this.userService.OTPValidation(p).subscribe(
        (res: any) => {
          this.loading = false;
          this.modalService.open(this.restPassword);
        },
        (err: any) => {
          this.loading = false;
          this.toastr.error(err.error.message || "");
        }
      );
    }
  }

  close() {
    this.modalService.close();
  }

  onSavePassword() {
    let v = this.validateOTP();
    let f = this.resetGroup.value;
    if (v.status == false) {
      this.toastr.error(v.msg);
    } else {
      let p = {
        password: f.newpsw || "",
      };
      this.loading = true;
      this.userService.resetPassword(this.formGroup.value.email, p).subscribe(
        (res: any) => {
          this.loading = false;
          this.modalService.close();
          this.router.navigate(["/login"]);
        },
        (err: any) => {
          this.loading = false;
          this.toastr.error(err.error.message || "");
        }
      );
    }
  }
}
