import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormControl, FormGroup } from "@angular/forms";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";
import { analyzeAndValidateNgModules } from "@angular/compiler";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.css"],
})
export class AddRoleComponent implements OnInit {
  formGroup: FormGroup;
  curTab = "all";
  featureData: any;
  roleData: any;
  urlParams: any;
  all: any;
  constructor(
    private appService: AppService,
    private userService: UserService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.appService.pageTitle = "addrole - Task Management";
    this.formGroup = this.getFormGroup();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data;
    });
    this.getFeatures();
    if (this.urlParams.id) {
      this.viewRole();
    }
  }

  getFormGroup() {
    let fg = new FormGroup({
      name: new FormControl(""),
      all: new FormControl(""),
    });
    return fg;
  }

  validateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    if (!fg.name) {
      msg = "Enter the Role";
    }
    return {
      msg: msg,
      status: msg == "" ? true : false,
    };
  }

  getFeatures() {
    this.userService.featureList().subscribe(
      (res: any) => {
        this.featureData = res || {};
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  viewRole() {
    this.userService.viewRole(this.urlParams.id || "").subscribe(
      (res: any) => {
        this.roleData = res;
      },
      (err: any) => {
        this.router.navigate(["**"]);
        this.toastr.error(err.error.message);
      }
    );
  }

  onApiCall() {
    console.log(this.formGroup.value.all);

    let p = {
      roleName: this.formGroup.value.name,
      fetureList: "",
    };
    if (this.urlParams.id) {
      this.editRole(this.urlParams.id, p);
    }
    this.addRole(p);
  }

  addRole(p: any) {
    this.userService.addRole(p).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  editRole(url: any, p: any) {
    this.userService.editRole(url, p).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  onCancel() {
    this.formGroup.reset();
    this.router.navigate(["/dashboard"]);
  }
}
