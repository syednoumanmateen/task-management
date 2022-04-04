import { AppService } from "src/app/providers/app.service";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/providers/user.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { threadId } from "worker_threads";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: [
    "./add-task.component.css",
    "../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss",
    "../../../vendor/libs/ng-select/ng-select.scss",
  ],
})
export class AddTaskComponent implements OnInit {
  urlParams: any;
  abc: any;
  taskData: any;
  date: any;
  userData: any;
  timeFrom: any;
  timeTo: any;
  curOpt = "high";
  loading: Boolean;
  formGroup: FormGroup;
  userDetails: any;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private activtedRoute: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {
    this.appService.pageTitle = "addTask - Task Management";
    this.formGroup = this.getFormGroup();
    this.timeFrom = "";
    this.timeTo = "";
    this.loading = false;
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
    console.log(this.timeFrom.hour);
    let v = this.valiadateForm();
    let fg = this.formGroup.value;
    if (v.status == false) {
      this.toastr.error(v.msg);
    } else {
      this.userView();
      let p = {
        parentId: fg.id,
        type: fg.type,
        title: fg.title,
        description: fg.description,
        attachment: fg.attachment,
        projectId: this.urlParams.id,
        member: {
          id: fg.user,
          name: this.userDetails.fName,
        },
        fromDate: this.date[0],
        toDate: this.date[1],
        fromTime: this.timeFrom.hour + ":" + this.timeFrom.minute,
        toTime: this.timeTo.hour + ":" + this.timeTo.minute,
        effort: {
          type: fg.effortType,
          value: fg.effortValue,
        },
        priority: fg.priority,
      };
      this.addtask(p);
    }
  }

  // editTask(url: any, p: any) {
  //   this.loading = true;
  //   this.userService.editTask(url, p).subscribe(
  //     (res: any) => {
  //       this.loading = false;
  //       this.toastr.success(res.data.message);
  //       this.router.navigate(["/Projects/view-project"]);
  //     },
  //     (err: any) => {
  //       this.loading = false;
  //       this.toastr.error(err.error.message);
  //     }
  //   );
  // }

  addtask(p: any) {
    this.loading = true;
    this.userService.addTask(p).subscribe(
      (res: any) => {
        this.loading = false;
        this.toastr.success(res.data.message);
        this.router.navigate(["/projects/view-project"]);
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  onCancel() {
    this.formGroup.reset();
    this.router.navigate(["/projects/view-project"]);
  }

  viewTask(url: any) {
    let p = url;
    this.loading = true;
    this.userService.viewTask(p).subscribe(
      (res: any) => {
        this.loading = false;
        this.taskData = res[0] || {};
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  userList() {
    this.loading = true;
    this.userService.listUser().subscribe(
      (res: any) => {
        this.loading = false;
        this.userData = res || {};
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  userView() {
    this.loading = true;
    this.userService.viewUser(this.formGroup.value.user).subscribe(
      (res: any) => {
        this.loading = false;
        this.userDetails = res.userData || {};
      },
      (err: any) => {
        this.loading = false;
        this.router.navigate(["**"]);
        this.toastr.error(err.error.message || "");
      }
    );
  }
}
