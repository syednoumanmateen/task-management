import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tasks-view",
  templateUrl: "./tasks-view.component.html",
  styleUrls: ["./tasks-view.component.css"],
})
export class TasksViewComponent implements OnInit {
  constructor(private appService: AppService) {
    this.appService.pageTitle = "TaskView - Task Management";
  }

  ngOnInit(): void {}
}
