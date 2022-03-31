import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/providers/user.service";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";
import { S_IFREG } from "constants";
import { threadId } from "worker_threads";

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
  // date: any;
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
      lead: new FormControl(""),
      user: new FormControl(""),
      role: new FormControl(""),
      description: new FormControl(""),
      date: new FormControl(""),
    });
    return fg;
  }

  validateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    if (!fg.name.trim()) {
      msg = "enter The Pr oject Name";
    } else if (!fg.lead) {
      msg = "Select  The Team Leader";
    } else if (!fg.user) {
      msg = "Select the Team Members";
    } else if (!fg.role) {
      msg = "Select The Role";
    } else if (!fg.description.trim()) {
      msg = "Enter The Description";
    } else if (!fg.date[0] || !fg.date[1]) {
      msg = "Select The Start Date And Dedline Date Of Project";
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
        nameOfProject: fg.name,
        handledBy: fg.lead,
        //  {
        //   _id: "i._id",
        //   fName: "i.fName",
        //   lName: "i.lName",
        // },
        members: fg.user,
        // {
        //   _id: "j._id",
        //   fName: "j.fName",
        //   lName: "j.lName",
        // },
        // role: fg.role,
        projectDescription: fg.description,
        startDate: fg.date[0],
        endDate: fg.date[1],
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
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  onEditProject(id: any, p: any) {
    this.userService.editProject(id, p).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  viewProject() {
    this.userService.viewProject(this.urlParams.id).subscribe(
      (res: any) => {
        this.projectData = res[0];
        this.setValue();
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  onCancel() {}

  setValue() {
    let fg = this.formGroup;
    let p = this.projectData;
    fg.controls.name.setValue(p.nameOfProject || "");
    fg.controls.lead.setValue(p.handledBy || "");
    fg.controls.user.setValue(p.members || "");
    // fg.controls.role.setValue(p.nameOfProject || "");
    fg.controls.description.setValue(p.projectDescription || "");
    fg.controls.date.setValue(p.startDate - p.endDate || "");
  }
}
