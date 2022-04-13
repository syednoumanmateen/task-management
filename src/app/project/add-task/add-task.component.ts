import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { AppService } from "src/app/providers/app.service";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/providers/user.service";
import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ModalService } from "src/app/providers/modal.service";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: [
    "./add-task.component.css",
    "../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss",
    "../../../vendor/libs/ng-select/ng-select.scss",
    "../../../vendor/libs/ngx-markdown-editor/ngx-markdown-editor.scss",
    "../../../vendor/libs/quill/typography.scss",
    "../../../vendor/libs/quill/editor.scss",
  ],
})
export class AddTaskComponent implements OnInit {
  urlParams: any;
  OFF = false;
  quillShow: any;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
  };

  task: {
    data: any;
    loading: Boolean;
  };
  user: {
    data: any;
    loading: Boolean;
  };
  // time: {
  //   from: any;
  //   to: any;
  // };
  detailed: {
    user: any;
    loading: Boolean;
  };
  add: {
    data: {};
    loading: Boolean;
  };
  edit: {
    data: {};
    loading: Boolean;
  };
  project: {
    data: any;
    loading: Boolean;
  };
  date: {
    start: any;
    end: any;
  };
  curOpt = "high";
  formGroup: FormGroup;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private activtedRoute: ActivatedRoute,
    private appService: AppService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.appService.pageTitle = "addTask - Task Management";
    this.formGroup = this.getFormGroup();
    this.quillShow = false;
    this.task = {
      data: {},
      loading: false,
    };
    this.user = {
      data: {},
      loading: false,
    };
    // this.time = {
    //   from: {},
    //   to: {},
    // };
    this.detailed = {
      user: {},
      loading: false,
    };
    this.add = {
      data: {},
      loading: false,
    };
    this.edit = {
      data: {},
      loading: false,
    };
    this.project = {
      data: {},
      loading: false,
    };
    this.date = {
      start: {},
      end: {},
    };
  }

  ngOnInit(): void {
    this.activtedRoute.queryParams.subscribe((data) => {
      this.urlParams = data;
    });
    this.viewProject(this.urlParams.id);
    this.userList();
    // this.getProject();
  }

  getFormGroup() {
    let fg = new FormGroup({
      project: new FormControl(""),
      id: new FormControl(""),
      type: new FormControl(""),
      title: new FormControl(""),
      description: new FormControl(""),
      effortType: new FormControl(""),
      effortValue: new FormControl(""),
      user: new FormControl(""),
      attachment: new FormControl(""),
      priority: new FormControl(""),
      startDate: new FormControl(""),
      endDate: new FormControl(""),
      timeFrom: new FormControl(""),
      timeTo: new FormControl(""),
    });
    return fg;
  }

  valiadateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    console.log(fg);

    if (!fg.type.trim()) {
      msg = "Enter The Type";
    } else if (!fg.effortType.trim()) {
      msg = "Enter The Effort Type";
    } else if (!fg.effortValue.trim()) {
      msg = "Enter The Effort Value";
    } else if (!fg.priority) {
      msg = "Select The Priority";
    } else if (!fg.user) {
      msg = "Select The Member";
    } else if (!fg.startDate.day) {
      msg = "Select The Start Date";
    } else if (!fg.endDate.day) {
      msg = "Select The End Date";
    } else if (fg.endDate.day < fg.startDate) {
      msg = "The Start Date Should Be Less Than End Date";
    } else if (!fg.timeFrom.hour || !fg.timeFrom.minute) {
      msg = "Select The From Time";
    } else if (!fg.timeTo.hour || !fg.timeTo.minute) {
      msg = "Select The To Time";
    } else {
      msg = "";
    }
    return {
      msg: msg,
      status: msg == "" ? true : false,
    };
  }

  onApiCall() {
    console.log(this.formGroup.value.timeFrom);
    console.log(this.formGroup.value.timeTo);
    let v = this.valiadateForm();
    if (v.status == false) {
      this.toastr.error(v.msg);
    } else {
      console.log("trig");

      this.userView();
    }
  }

  onCancel() {
    this.formGroup.reset();
    this.modalService.close();
  }

  viewProject(url: any) {
    console.log(url);

    let p = url;
    this.project.loading = true;
    this.userService.viewProject(p).subscribe(
      (res: any) => {
        this.project.loading = false;
        this.project.data = res[0] || {};
        console.log(res[0]);

        this.setValue();
      },
      (err: any) => {
        this.project.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  getProject() {
    let p = {};
    this.project.loading = true;
    this.userService.projectList(p).subscribe(
      (res: any) => {
        this.project.loading = false;
        this.project.data = res || {};
      },
      (err: any) => {
        this.project.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  userList() {
    let p = {};
    this.user.loading = true;
    this.userService.listUser(p).subscribe(
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

  userView() {
    this.detailed.loading = true;
    this.userService.viewUser(this.formGroup.value.user).subscribe(
      (res: any) => {
        this.detailed.loading = false;
        this.detailed.user = res.userData || {};
        this.taskAddEdit();
      },
      (err: any) => {
        this.detailed.loading = false;
        this.router.navigate(["**"]);
        this.toastr.error(err.error.message || "");
      }
    );
  }

  taskAddEdit() {
    let fg = this.formGroup.value;
    let p = {
      type: fg.type,
      title: fg.title,
      description: fg.description,
      attachment: fg.attachment,
      member: {
        id: fg.user,
        name: this.detailed.user.fName,
      },
      fromDate:
        fg.startDate.day + "/" + fg.startDate.month + "/" + fg.startDate.year,
      toDate: fg.endDate.day + "/" + fg.endDate.month + "/" + fg.endDate.year,
      fromTime: fg.timeFrom.hour + ":" + fg.timeFrom.minute,
      // this.time.from.hour + ":" + this.time.from.minute,
      toTime: fg.timeTo.hour + ":" + fg.timeTo.minute,
      //  this.time.to.hour + ":" + this.time.to.minute,
      effort: {
        type: fg.effortType,
        value: fg.effortValue,
      },
      priority: fg.priority,
    };
    if (this.urlParams.type) {
      this.editTask(p);
    } else {
      this.addTask(p);
    }
  }

  addTask(p: any) {
    this.add.loading = true;
    this.userService.addTask(this.urlParams.id, p).subscribe(
      (res: any) => {
        this.add.loading = false;
        this.toastr.success(res.data.message);
        this.router.navigate(["/projects/view-project"], {
          queryParams: {
            id: this.urlParams.id,
          },
        });
      },
      (err: any) => {
        this.add.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  editTask(p: any) {
    this.edit.loading = true;
    this.userService.editTask(this.urlParams.id, p).subscribe(
      (res: any) => {
        this.edit.loading = false;
        this.toastr.success(res.data.message);
        this.router.navigate(["/projects/view-project"], {
          queryParams: {
            id: this.urlParams.id,
          },
        });
      },
      (err: any) => {
        this.edit.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  onInputClick() {
    this.quillShow = this.quillShow == false ? true : false;
  }

  Cancel() {
    this.quillShow = false;
  }

  setValue() {
    let fg = this.formGroup;
    fg.controls.id.setValue("");
    fg.controls.type.setValue("");
    fg.controls.description.setValue("");
    fg.controls.effortType.setValue("");
    fg.controls.effortValue.setValue("");
    fg.controls.attachment.setValue("");
    fg.controls.priority.setValue("");
    fg.controls.id.setValue("");
    fg.controls.id.setValue("");
  }
}
