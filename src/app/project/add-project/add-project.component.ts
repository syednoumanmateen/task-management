import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/providers/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";
import { timeStamp } from "console";

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
  urlParams: any;
  userData: any;
  roleData: any;
  projectData: any;
  date: Array<any>;

  disabled = false;
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.appService.pageTitle = "addProject - Task Management";
    this.formGroup = this.getFormGroup();
    this.date = [];
    this.urlParams = {};
    this.userData = {};
    this.roleData = {};
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data || "";
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
      },
      (err: any) => {
        this.toastr.error(err.error.message || "");
      }
    );
  }

  getRoles() {
    this.userService.roleList().subscribe(
      (res: any) => {
        this.roleData = res || {};
      },
      (err: any) => {
        this.toastr.error(err.error.message || "");
      }
    );
  }

  getFormGroup() {
    let fg = new FormGroup({
      name: new FormControl(""),
      lead: new FormControl(""),
      user: new FormControl(""),
      description: new FormControl(""),
    });
    return fg;
  }

  validateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    if (!fg.name.trim()) {
      msg = "enter The Project Name";
    } else if (!fg.lead) {
      msg = "Select  The Team Leader";
    } else if (!fg.user) {
      msg = "Select the Team Members";
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
        nameOfProject: fg.name || "",
        handledBy: fg.lead || "",
        members: fg.user || "",
        projectDescription: fg.description || "",
        startDate: this.date[0] || [],
        endDate: this.date[1] || [],
      };
      if (this.urlParams.id) {
        this.onEditProject(this.urlParams.id, p);
      } else {
        this.onAddProject(p);
      }
    }
  }

  onAddProject(p: any) {
    this.userService.addProject(p).subscribe(
      (res: any) => {
        this.toastr.success(res.data.message || "");
        this.router.navigate(["/projects"]);
      },
      (err: any) => {
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onEditProject(id: any, p: any) {
    this.userService.editProject(id, p).subscribe(
      (res: any) => {
        this.toastr.success(res.data.message || "");
        this.router.navigate(["/projects"]);
      },
      (err: any) => {
        this.toastr.error(err.error.message || "");
      }
    );
  }

  viewProject() {
    this.userService.viewProject(this.urlParams.id).subscribe(
      (res: any) => {
        this.projectData = res[0] || [];
        this.setValue();
      },
      (err: any) => {
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onCancel() {
    this.formGroup.reset();
    this.router.navigate(["/dashboard"]);
  }

  setValue() {
    let fg = this.formGroup;
    let p = this.projectData;
    fg.controls.name.setValue(p.nameOfProject || "");
    fg.controls.lead.setValue(p.handledBy || "");
    fg.controls.user.setValue(p.members || "");
    fg.controls.description.setValue(p.projectDescription || "");
    this.date = [this.projectData.startDate, this.projectData.endDate];
  }

  // private formatDate(date: any) {
  //   const d = new Date(date);
  //   let month = "" + (d.getMonth() + 1);
  //   let day = "" + d.getDate();
  //   const year = d.getFullYear();
  //   if (month.length < 2) month = "0" + month;
  //   if (day.length < 2) day = "0" + day;
  //   return [month, day, year].join("/");
  // }
}
