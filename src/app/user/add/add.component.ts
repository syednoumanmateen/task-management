import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "src/app/providers/app.service";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "./../../providers/user.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;
  urlParams: any;
  user: {
    data: any;
    loading: Boolean;
    exists: Boolean;
  };
  role: {
    data: any;
    loading: Boolean;
  };
  add: {
    loading: Boolean;
  };
  edit: {
    loading: Boolean;
  };
  constructor(
    private appService: AppService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.appService.pageTitle = "addUser - Task Management";
    this.formGroup = this.getFormGroup();
    this.urlParams = {};
    this.user = {
      data: {},
      loading: false,
      exists: false,
    };
    this.role = {
      data: {},
      loading: false,
    };
    this.add = {
      loading: false,
    };
    this.edit = {
      loading: false,
    };
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data || "";
    });
  }

  ngOnInit(): void {
    this.getRoles();
    if (this.urlParams.id) {
      this.userView();
    }
  }

  getFormGroup() {
    let fg = new FormGroup({
      fname: new FormControl(""),
      lname: new FormControl(""),
      dno: new FormControl(""),
      street: new FormControl(""),
      area: new FormControl(""),
      landmark: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl(""),
      pincode: new FormControl(""),
      mobileno: new FormControl(""),
      role: new FormControl(""),
      email: new FormControl(""),
      dob: new FormControl(""),
    });
    return fg;
  }
  validateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    if (!fg.fname.trim()) {
      msg = "Please Enter the First Name";
    } else if (!fg.lname.trim()) {
      msg = "Please Enter the Last Name";
    } else if (!fg.dno.trim()) {
      msg = "Please Enter the Door Number";
    } else if (!fg.street.trim()) {
      msg = "Please Enter the Street Name";
    } else if (!fg.area.trim()) {
      msg = "Please Enter the Area Name";
    } else if (!fg.landmark.trim()) {
      msg = "Please Enter the LandMark Address";
    } else if (!fg.city.trim()) {
      msg = "Please Enter the City Name";
    } else if (!fg.pincode) {
      msg = "Please Enter the Valid Pincode";
    } else if (!fg.mobileno) {
      msg = "Please Enter the Valid Mobile Number";
    } else if (!fg.role.trim()) {
      msg = "Please Enter the Role";
    } else if (!fg.email.trim()) {
      msg = "Please Enter the Valid Email";
    } else {
      msg = "";
    }
    return {
      msg: msg,
      status: msg == "" ? true : false,
    };
  }
  onApiCall() {
    let v = this.validateForm();
    if (v.status == false) {
      this.toastr.error(v.msg);
    } else {
      let fg = this.formGroup.value;
      let p = {
        fName: fg.fname || "",
        lName: fg.lname || "",
        address: {
          doorNumber: fg.dno || "",
          street: fg.street || "",
          area: fg.area || "",
          landmark: fg.landmark || "",
          city: fg.city || "",
          state: fg.state || "",
          postalCode: fg.pincode || 0,
        },
        phone: fg.mobileno || 0,
        email: fg.email || "",
        role: fg.role || "",
      };
      if (this.urlParams.id) {
        this.editUser(this.urlParams.id, p);
      } else {
        this.addUser(p);
      }
    }
  }
  addUser(p: any) {
    this.add.loading = true;
    this.userService.addUser(p).subscribe(
      (res: any) => {
        this.add.loading = false;
        this.toastr.success(res.data.message || "");
        this.router.navigate(["/users"]);
      },
      (err: any) => {
        this.add.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }
  editUser(url: string, p: any) {
    this.edit.loading = true;
    this.userService.editUser(url, p).subscribe(
      (res: any) => {
        this.edit.loading = false;
        this.toastr.success(res.data.message || "");
        this.router.navigate(["/users"]);
      },
      (err: any) => {
        this.edit.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onCancel() {
    this.formGroup.reset();
    this.modalService.dismissAll();
  }

  getRoles() {
    this.role.loading = true;
    this.userService.roleList().subscribe(
      (res: any) => {
        this.role.loading = false;
        this.role.data = res || "";
      },
      (err: any) => {
        this.role.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  userView() {
    this.user.loading = true;
    this.userService.viewUser(this.urlParams.id).subscribe(
      (res: any) => {
        this.user.loading = false;
        this.user.data = res.userData || {};
        this.user.exists = true;
        this.toastr.success(res.data.message || "");
        this.setValue();
      },
      (err: any) => {
        this.user.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  setValue() {
    let fg = this.formGroup;
    let u = this.user.data;
    fg.controls.fname.setValue(u.fName || "");
    fg.controls.lname.setValue(u.lName || "");
    fg.controls.dno.setValue(u.address.doorNumber || "");
    fg.controls.street.setValue(u.address.street || "");
    fg.controls.area.setValue(u.address.area || "");
    fg.controls.landmark.setValue(u.address.landmark || "");
    fg.controls.city.setValue(u.address.city || "");
    fg.controls.state.setValue(u.address.state || "");
    fg.controls.pincode.setValue(u.address.postalCode || "");
    fg.controls.mobileno.setValue(u.phone || "");
    fg.controls.email.setValue(u.email || "");
    fg.controls.role.setValue(u.role || "");
  }
}
