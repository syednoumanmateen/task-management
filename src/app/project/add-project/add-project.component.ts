import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/providers/user.service";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: [
    "./add-project.component.css",
    "../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss",
    "../../../vendor/libs/ng-select/ng-select.scss",
  ],
})
export class AddProjectComponent implements OnInit {
  formGroup: FormGroup;
  date: any;
  urlParams: any;
  userData: any;
  roleData: any;
  projectData: any;

  disabled = false;
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.appService.pageTitle = "addProject - Task Management";
    this.formGroup = this.getFormGroup();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data;
    });
    this.userList();
    this.getRoles();
    if (this.urlParams.id) {
      this.viewProject();
    }
  }

  userList() {
    this.userService.listUser().subscribe(
      (res: any) => {
        this.userData = res || {};
        console.log(res[0].fName);
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    );
  }

  getRoles() {
    this.userService.roleList().subscribe(
      (res: any) => {
        this.roleData = res;
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    );
  }

  getFormGroup() {
    let fg = new FormGroup({
      name: new FormControl(""),
      
    });
    return fg;
  }

  validateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    if (fg) {
      msg = "";
    }
    return {
      msg: msg,
      status: (msg = "") ? true : false,
    };
  }

  viewProject() {
    this.userService.viewProject(this.urlParams.id).subscribe(
      (res: any) => {
        this.projectData = res[0];
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  onApiCall() {}

  onCancel() {}

  setValue() {
    let fg = this.formGroup;
    let u = "";
    fg.controls.name.setValue(u || "");
    fg.controls.module.setValue(u || "");
    fg.controls.description.setValue(u || "");
  }
}
