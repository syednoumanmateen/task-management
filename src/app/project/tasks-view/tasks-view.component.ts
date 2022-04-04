import { UserService } from "src/app/providers/user.service";
import { ActivatedRoute } from "@angular/router";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tasks-view",
  templateUrl: "./tasks-view.component.html",
  styleUrls: ["./tasks-view.component.css"],
})
export class TasksViewComponent implements OnInit {
  urlParams: any;
  task: {
    data: any;
    loading: Boolean;
  };
  constructor(
    private appService: AppService,
    private activatedRouete: ActivatedRoute,
    private userService: UserService
  ) {
    this.appService.pageTitle = "TaskView - Task Management";
    this.task = {
      data: {},
      loading: false,
    };
  }

  ngOnInit(): void {
    this.activatedRouete.queryParams.subscribe((data) => [
      (this.urlParams = data),
    ]);
    this.viewTaskList();
  }

  viewTaskList() {
    this.task.loading = true;
    this.userService.viewTask(this.urlParams.id).subscribe(
      (res: any) => {
        this.task.loading = false;
        this.task.data = res[0] || {};
      },
      (err: any) => {
        this.task.loading = false;
      }
    );
  }

  onEdit(id: any) {}

  onView(id: any) {}
}
