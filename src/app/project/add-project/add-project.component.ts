import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/providers/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: [
    "./add-project.component.css",
    "../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss",
    "../../../vendor/libs/ng-select/ng-select.scss",
    "../../../vendor/libs/ngx-markdown-editor/ngx-markdown-editor.scss",
    "../../../vendor/libs/quill/typography.scss",
    "../../../vendor/libs/quill/editor.scss",
  ],
})
export class AddProjectComponent implements OnInit {
  formGroup: FormGroup;
  urlParams: any;
  quillShow: Boolean;
  comment: any;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
  };

  user: {
    data: any;
    loading: Boolean;
  };
  addProject: {
    data: any;
    loading: Boolean;
  };
  editProject: {
    data: any;
    loading: Boolean;
  };
  viewProject: {
    data: any;
    loading: Boolean;
    exists: Boolean;
  };
  date: {
    start: any;
    end: any;
  };

  disabled = false;
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.appService.pageTitle = "addProject - Task Management";
    this.formGroup = this.getFormGroup();
    this.date = {
      start: {},
      end: {},
    };
    this.quillShow = false;
    this.urlParams = {};
    (this.user = {
      data: {},
      loading: false,
    }),
      (this.addProject = {
        data: {},
        loading: false,
      });
    this.editProject = {
      data: {},
      loading: false,
    };
    this.viewProject = {
      data: {},
      loading: false,
      exists: false,
    };
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data || "";
    });
    this.userList();
    // this.getRoles();
    if (this.urlParams.id) {
      this.getViewProject();
    }
  }

  userList() {
    this.user.loading = true;
    this.userService.listUser().subscribe(
      (res: any) => {
        this.user.loading = false;
        this.user.data = res || {};
      },
      (err: any) => {
        this.user.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  // getRoles() {
  //   this.role.loading = true;
  //   this.userService.roleList().subscribe(
  //     (res: any) => {
  //       this.role.loading = false;
  //       this.role.data = res || {};
  //     },
  //     (err: any) => {
  //       this.role.loading = false;
  //       this.toastr.error(err.error.message || "");
  //     }
  //   );
  // }

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
        startDate: [],
        endDate: [],
      };
      if (this.urlParams.id) {
        this.onEditProject(this.urlParams.id, p);
      } else {
        this.onAddProject(p);
      }
    }
  }

  onAddProject(p: any) {
    this.addProject.loading = true;
    this.userService.addProject(p).subscribe(
      (res: any) => {
        this.addProject.loading = false;
        this.toastr.success(res.data.message || "");
        this.router.navigate(["/projects"]);
      },
      (err: any) => {
        this.addProject.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onEditProject(id: any, p: any) {
    this.editProject.loading = true;
    this.userService.editProject(id, p).subscribe(
      (res: any) => {
        this.editProject.loading = false;
        this.toastr.success(res.data.message || "");
        this.router.navigate(["/projects"]);
      },
      (err: any) => {
        this.editProject.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  getViewProject() {
    this.viewProject.loading = true;
    this.userService.viewProject(this.urlParams.id).subscribe(
      (res: any) => {
        this.viewProject.exists = true;
        this.viewProject.loading = false;
        this.viewProject.data = res[0] || [];
        this.setValue();
      },
      (err: any) => {
        this.viewProject.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onCancel() {
    this.formGroup.reset();
    this.modalService.dismissAll();
  }

  onInputClick() {
    this.quillShow = this.quillShow == false ? true : false;
  }

  Cancel() {
    this.quillShow = false;
  }

  setValue() {
    let fg = this.formGroup;
    let p = this.viewProject.data;
    fg.controls.name.setValue(p.nameOfProject || "");
    fg.controls.lead.setValue(p.handledBy || "");
    fg.controls.user.setValue(p.members || "");
    fg.controls.description.setValue(p.projectDescription || "");
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
