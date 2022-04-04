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
  taskData: any;
  loading: Boolean;
  constructor(
    private appService: AppService,
    private activatedRouete: ActivatedRoute,
    private userService: UserService
  ) {
    this.appService.pageTitle = "TaskView - Task Management";
    this.loading = false;
  }

  ngOnInit(): void {
    this.activatedRouete.queryParams.subscribe((data) => [
      (this.urlParams = data),
    ]);
    this.viewTaskList();
  }

  viewTaskList() {
    this.loading = true;
    this.userService.viewTask(this.urlParams.id).subscribe(
      (res: any) => {
        this.loading = false;
        this.taskData = res[0] || {};
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }

  onEdit(id: any) {}

  onView(id: any) {}
}
