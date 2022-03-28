import { AppService } from 'src/app/providers/app.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  curTab = "project";
  constructor(
    private appService:AppService
  ) {
    this.appService.pageTitle = "tasks - Task Management";
  }

  ngOnInit(): void {}
}
