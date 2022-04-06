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
    this.appService.pageTitle = "Add Project - Task Management";
    this.formGroup = this.getFormGroup();
    this.quillShow = false;
    this.date = {
      start: {},
      end: {},
    };
    this.urlParams = {};
    (this.user = {
      data: {},
      loading: false,
    }),
      (this.addProject = {
        data: {},
        loading: false,
      });
  }

  ngOnInit(): void {
    this.userList();
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

  getFormGroup() {
    let fg = new FormGroup({
      name: new FormControl(""),
      lead: new FormControl(""),
      user: new FormControl(""),
      description: new FormControl(""),
      attachment: new FormControl(""),
      startDate: new FormControl(""),
      endDate: new FormControl(""),
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
    } else if (!fg.startDate.day) {
      msg = "Choose The Start Date";
    } else if (!fg.endDate.day) {
      msg = "Choose The End Date";
    } else {
      msg = "";
    }
    return {
      msg: msg,
      status: msg == "" ? true : false,
    };
  }

  onApiCall() {
    console.log(this.formGroup.value.startDate);

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
        startDate: fg.startDate,
        endDate: fg.endDate,
      };
      this.onAddProject(p);
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
}
