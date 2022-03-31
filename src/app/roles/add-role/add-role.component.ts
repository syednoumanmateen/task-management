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
  urlParams: any;
  roleName: any;
  featureList: any;
  featureSelect: Array<any>;
  constructor(
    private appService: AppService,
    private userService: UserService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.appService.pageTitle = "addrole - Task Management";
    this.formGroup = this.getFormGroup();
    this.featureSelect = [];
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data;
    });
    if (!this.urlParams.id) {
      this.getFeatures();
    } else {
      this.viewRole();
    }
  }

  featureSelected() {
    if (this.urlParams.id) {
      this.featureSelect = this.featureData.featureList.filter(
        (value: any, Index: number) => {
          return value.isChecked;
        }
      );
    }
    this.featureSelect = this.featureData.filter(
      (value: any, Index: number) => {
        return value.isChecked;
      }
    );
    this.featureList = this.featureSelect.concat(
      this.features.filter((feature1) =>
        this.selectedFeatures.every((feature2) => feature2._id !== feature1._id)
      )
    );
  }

  getFormGroup() {
    let fg = new FormGroup({
      name: new FormControl(""),
      feature: new FormControl(""),
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
        this.featureData = (res.slice(0) || []).map((e: any) => {
          e.isChecked = false;
          return e;
        });
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  viewRole() {
    this.userService.viewRole(this.urlParams.id || "").subscribe(
      (res: any) => {
        this.roleName = res;
        this.featureData = (this.roleName.featureList.slice(0) || []).map(
          (e: any) => {
            e.isChecked = true;
            return e;
          }
        );
        this.setValue();
      },
      (err: any) => {
        this.router.navigate(["**"]);
        this.toastr.error(err.error.message);
      }
    );
  }

  onApiCall() {
    let v = this.validateForm();
    if (v.status == false) {
      this.toastr.error(v.msg);
    } else {
      let p = {
        roleName: this.formGroup.value.name,
        featureList: this.featureSelect,
      };
      if (this.urlParams.id) {
        this.editRole(this.urlParams.id, p);
      } else {
        this.addRole(p);
      }
    }
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

  setValue() {
    this.formGroup.controls.name.setValue(this.roleName.roleName);
  }

  onCancel() {
    this.formGroup.reset();
    this.router.navigate(["/dashboard"]);
  }
}
