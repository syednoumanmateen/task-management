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
  styleUrls: ["./add-task.component.css"],
})
export class AddTaskComponent implements OnInit {
  urlParams: any;
  taskData: any;
  date: any;
  timeFrom: string;
  timeTo: string;
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
    this.timeFrom = "";
    this.timeTo = "";
  }

  ngOnInit(): void {
    this.activtedRoute.queryParams.subscribe((data) => {
      this.urlParams = data;
    });
    if (this.urlParams.id) {
      this.viewTask(this.urlParams.id);
    }
  }

  getFormGroup() {
    let fg = new FormGroup({
      id: new FormControl(""),
      type: new FormControl(""),
      title: new FormControl(""),
      description: new FormControl(""),
      effortType: new FormControl(""),
      effortValue: new FormControl(""),
      attachment: new FormControl(""),
      priority: new FormControl(""),
    });
    return fg;
  }

  valiadateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    if (!fg.id) {
      msg = "Enter The Parent Id";
    } else if (!fg.type) {
      msg = "Enter The Type";
    } else if (!fg.description) {
      msg = "Enter The Description";
    } else if (!fg.effortType) {
      msg = "Enter The Effort Type";
    } else if (!fg.effortValue) {
      msg = "Enter The Effort Value";
    } else if (!fg.attachment) {
      msg = "Add The Attachment";
    } else if (!fg.priority) {
      msg = "Select The Priority";
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
    let fg = this.formGroup.value;
    if (v.status == false) {
      this.toastr.error(v.msg);
    } else {
      let p = {
        parentId: fg.id,
        type: fg.type,
        title: fg.title,
        description: fg.description,
        attachment: fg.attachment,
        fromDate: this.date[0],
        toDate: this.date[1],
        fromTime: "this.timeFrom",
        toTime: "this.timeTo",
        effort: {
          type: fg.effortType,
          value: fg.effortValue,
        },
        priority: fg.priority,
      };
      if (this.urlParams.id) {
        this.editTask(this.urlParams.is, p);
      } else {
        this.addtask(p);
      }
    }
  }

  editTask(url: any, p: any) {
    this.userService.editTask(url, p).subscribe(
      (res: any) => {
        this.toastr.success(res.data.message);
        this.router.navigate(["/tasks"]);
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  addtask(p: any) {
    this.userService.addTask(p).subscribe(
      (res: any) => {
        this.toastr.success(res.data.message);
        this.router.navigate(["/tasks"]);
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  onCancel() {
    this.formGroup.reset();
    this.router.navigate(["/tasks"]);
  }

  viewTask(url: any) {
    let p = url;
    this.userService.viewTask(p).subscribe(
      (res: any) => {
        this.taskData = res[0] || {};
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
