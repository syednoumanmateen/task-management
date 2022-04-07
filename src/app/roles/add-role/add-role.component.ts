import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormControl, FormGroup } from "@angular/forms";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.css"],
})
export class AddRoleComponent implements OnInit {
  formGroup: FormGroup;
  curTab = "all";
  urlParams: any;
  features: any;
  role: {
    data: any;
    loading: Boolean;
  };
  view: {
    data: any;
    loading: Boolean;
    exists: Boolean;
  };
  add: {
    data: any;
    loading: Boolean;
  };
  edit: {
    data: any;
    loading: Boolean;
  };
  selectedFeatures: any;
  featureList: any;
  constructor(
    private appService: AppService,
    private userService: UserService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.appService.pageTitle = "addrole - Task Management";
    this.formGroup = this.getFormGroup();
    this.urlParams = {};
    this.features = {};
    this.selectedFeatures = {};
    this.featureList = {};
    this.role = {
      data: {},
      loading: false,
    };
    this.view = {
      data: {},
      loading: false,
      exists: false,
    };
    this.add = {
      data: {},
      loading: false,
    };
    this.edit = {
      data: {},
      loading: false,
    };
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data || "";
    });
    if (this.urlParams.id) {
      this.viewRole();
    }
    this.getFeatures();
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
    this.role.loading = true;
    this.userService.featureList().subscribe(
      (res: any) => {
        this.role.loading = false;
        if (this.urlParams.id) {
          this.featureList = (res.slice(0) || []).map((e: any) => {
            e.isChecked = false;
            return e;
          });
          this.features = this.selectedFeatures.concat(
            this.featureList.filter((feature1: any) =>
              this.selectedFeatures.every(
                (feature2: any) => feature2._id !== feature1._id
              )
            )
          );
        } else {
          this.features = (res.slice(0) || []).map((e: any) => {
            e.isChecked = false;
            return e;
          });
        }
      },
      (err: any) => {
        this.role.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  viewRole() {
    this.view.loading = true;
    this.userService.viewRole(this.urlParams.id || "").subscribe(
      (res: any) => {
        this.view.loading = false;
        this.view.data = res;
        this.setValue();
        this.view.exists = true;
        this.selectedFeatures = (res.featureList.slice(0) || []).map(
          (e: any) => {
            e.isChecked = true;
            return e;
          }
        );
      },
      (err: any) => {
        this.view.loading = false;
        this.router.navigate(["**"]);
        this.toastr.error(err.error.message);
      }
    );
  }

  featureSelected() {
    this.selectedFeatures = this.features.filter((value: any) => {
      return value.isChecked;
    });
  }

  onApiCall() {
    let v = this.validateForm();
    if (v.status == false) {
      this.toastr.error(v.msg);
    } else {
      let p = {
        roleName: this.formGroup.value.name,
        featureList: this.selectedFeatures,
      };
      if (this.urlParams.id) {
        this.editRole(this.urlParams.id, p);
      } else {
        this.addRole(p);
      }
    }
  }

  addRole(p: any) {
    this.add.loading = true;
    this.userService.addRole(p).subscribe(
      (res: any) => {
        this.add.loading = false;
        this.toastr.success(res.data || "");
        this.router.navigate(["/roles"]);
      },
      (err: any) => {
        this.add.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  editRole(url: any, p: any) {
    this.edit.loading = true;
    this.userService.editRole(url, p).subscribe(
      (res: any) => {
        this.edit.loading = false;
        this.toastr.success(res.data || "");
        this.router.navigate(["/roles"]);
      },
      (err: any) => {
        this.edit.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  setValue() {
    this.formGroup.controls.name.setValue(this.view.data.roleName || "");
  }

  onCancel() {
    this.formGroup.reset();
    this.modalService.dismissAll();
  }
}
