import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "./../../providers/user.service";
import { FormControl, FormGroup } from "@angular/forms";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-feature",
  templateUrl: "./add-feature.component.html",
  styleUrls: ["./add-feature.component.css"],
})
export class AddFeatureComponent implements OnInit {
  formGroup: FormGroup;
  urlParams: any;
  userData: any;
  loading: Boolean;
  constructor(
    private appService: AppService,
    private userService: UserService,
    private toastr: ToastrService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {
    this.appService.pageTitle = "addfeature - Task Management";
    this.formGroup = this.getFormGroup();
    this.urlParams = {};
    this.loading = false;
  }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe((data) => [
      (this.urlParams = data || ""),
    ]);
    if (this.urlParams.id) {
      this.onViewFeature();
    }
  }
  getFormGroup() {
    let fg = new FormGroup({
      name: new FormControl(""),
      module: new FormControl(""),
      description: new FormControl(""),
    });
    return fg;
  }

  validateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    if (!fg.name.trim()) {
      msg = "Enter The Feature Name";
    } else if (!fg.module) {
      msg = "Select The Module Name";
    } else if (!fg.description.trim()) {
      msg = "Enter The Description";
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
        featureName: fg.name || "",
        decription: fg.description || "",
        moduleName: fg.module || "",
      };
      if (this.urlParams.id) {
        this.editFeature(this.urlParams.id, p);
      } else {
        this.addFeature(p);
      }
    }
  }

  addFeature(p: any) {
    this.loading = true;
    this.userService.addFeature(p).subscribe(
      (res: any) => {
        this.loading = false;
        this.toastr.success(res.data || "");
        this.router.navigate(["/features"]);
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  editFeature(url: any, p: any) {
    this.loading = true;
    this.userService.editFeature(url, p).subscribe(
      (res: any) => {
        this.loading = false;
        this.toastr.success(res.data || "");
        this.router.navigate(["/features"]);
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onCancel() {
    this.formGroup.reset();
    this.router.navigate(["/features"]);
  }

  onViewFeature() {
    this.loading = true;
    this.userService.viewFeature(this.urlParams.id).subscribe(
      (res: any) => {
        this.loading = false;
        this.userData = res || {};
        this.setValue();
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  setValue() {
    let fg = this.formGroup;
    let u = this.userData;
    fg.controls.name.setValue(u.featureName || "");
    fg.controls.module.setValue(u.moduleName || "");
    fg.controls.description.setValue(u.decription || "");
  }
}
