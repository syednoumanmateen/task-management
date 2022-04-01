import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/providers/user.service";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"],
})
export class AddTaskComponent implements OnInit {
  urlParams: any;
  taskData: any;
  date: any;
  formGroup: FormGroup;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private activtedRoute: ActivatedRoute
  ) {
    this.formGroup = this.getFormGroup();
  }

  ngOnInit(): void {
    this.activtedRoute.queryParams.subscribe((data) => {
      this.urlParams = data;
    });
  }

  getFormGroup() {
    let fg = new FormGroup({});
    return fg;
  }

  valiadateForm() {
    let fg = this.formGroup.value;
    let msg = "";
    if (fg) {
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
    } else {
      let p = {};
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
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  onCancel() {}
}
