import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/providers/user.service";
import { Router } from "@angular/router";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  curTab = "project";
  taskData: any;
  constructor(
    private appService: AppService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.appService.pageTitle = "tasks - Task Management";
    this.taskData = {};
  }

  ngOnInit(): void {
    this.getTask();
  }

  onAddTask() {
    this.router.navigate(["/tasks/add-task"]);
  }

  getTask() {
    this.userService.taskList().subscribe(
      (res: any) => {
        this.taskData = res || {};
      },
      (err: any) => {
        this.toastr.error(err.error.message || "");
      }
    );
  }
}
