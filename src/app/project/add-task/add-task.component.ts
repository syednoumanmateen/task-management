import { AppService } from "src/app/providers/app.service";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/providers/user.service";
import { Component, OnChanges, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { loadavg } from "os";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: [
    "./add-task.component.css",
    "../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss",
    "../../../vendor/libs/ng-select/ng-select.scss",
  ],
})
export class AddTaskComponent implements OnChanges, OnInit {
  urlParams: any;
  task: {
    data: any;
    loading: Boolean;
  };
  user: {
    data: any;
    loading: Boolean;
  };
  time: {
    from: any;
    to: any;
  };
  detailed: {
    user: any;
    loading: Boolean;
  };
  add: {
    data: {};
    loading: Boolean;
  };
  date: any;
  curOpt = "high";
  formGroup: FormGroup;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private activtedRoute: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {
    this.appService.pageTitle = "addTask - Task Management";
    this.formGroup = this.getFormGroup();
    this.task = {
      data: {},
      loading: false,
    };
    this.user = {
      data: {},
      loading: false,
    };
    this.time = {
      from: {},
      to: {},
    };
    this.detailed = {
      user: {},
      loading: false,
    };
    this.add = {
      data: {},
      loading: false,
    };
  }

  ngOnInit(): void {
    this.activtedRoute.queryParams.subscribe((data) => {
      this.urlParams = data;
    });
    if (this.urlParams.id) {
      this.viewTask(this.urlParams.id);
    }
    this.userList();
  }

  ngOnChanges() {}

  getFormGroup() {
    let fg = new FormGroup({
      id: new FormControl(""),
      type: new FormControl(""),
      title: new FormControl(""),
      description: new FormControl(""),
      effortType: new FormControl(""),
      effortValue: new FormControl(""),
      user: new FormControl(""),
      attachment: new FormControl(""),
      priority: new FormControl(""),
    });
    return fg;
  }

  valiadateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    if (!fg.id.trim()) {
      msg = "Enter The Parent Id";
    } else if (!fg.type.trim()) {
      msg = "Enter The Type";
    } else if (!fg.description.trim()) {
      msg = "Enter The Description";
    } else if (!fg.effortType.trim()) {
      msg = "Enter The Effort Type";
    } else if (!fg.effortValue.trim()) {
      msg = "Enter The Effort Value";
    } else if (!fg.attachment.trim()) {
      msg = "Add The Attachment";
    } else if (!fg.priority) {
      msg = "Select The Priority";
    } else if (!fg.user) {
      msg = "Select The Member";
    } else if (!this.date[0]) {
      msg = "Select The Start Date";
    } else if (!this.date[1]) {
      msg = "Select The End Date";
    } else {
      msg = "";
    }
    return {
      msg: msg,
      status: msg == "" ? true : false,
    };
  }

  onApiCall() {
    let v = this.valiadateForm();
    if (v.status == false) {
      this.toastr.error(v.msg);
    } else {
      this.userView();
    }
  }

  onCancel() {
    this.formGroup.reset();
    this.router.navigate(["/projects/view-project"]);
  }

  viewTask(url: any) {
    let p = url;
    this.task.loading = true;
    this.userService.viewTask(p).subscribe(
      (res: any) => {
        this.task.loading = false;
        this.task.data = res[0] || {};
      },
      (err: any) => {
        this.task.loading = false;
        this.toastr.error(err.error.message);
      }
    );
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

  userView() {
    this.detailed.loading = true;
    this.userService.viewUser(this.formGroup.value.user).subscribe(
      (res: any) => {
        this.detailed.loading = false;
        this.detailed.user = res.userData || {};
        this.addTask();
      },
      (err: any) => {
        this.detailed.loading = false;
        this.router.navigate(["**"]);
        this.toastr.error(err.error.message || "");
      }
    );
  }

  addTask() {
    let fg = this.formGroup.value;
    let p = {
      parentId: fg.id,
      type: fg.type,
      title: fg.title,
      description: fg.description,
      attachment: fg.attachment,
      member: {
        id: fg.user,
        name: this.detailed.user.fName,
      },
      fromDate: this.date[0],
      toDate: this.date[1],
      fromTime: this.time.from.hour + ":" + this.time.from.minute,
      toTime: this.time.to.hour + ":" + this.time.to.minute,
      effort: {
        type: fg.effortType,
        value: fg.effortValue,
      },
      priority: fg.priority,
    };
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
}
