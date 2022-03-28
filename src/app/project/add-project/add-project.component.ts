import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.css"],
})
export class AddProjectComponent implements OnInit {
  constructor(private appService: AppService) {
    this.appService.pageTitle = "addProject - Task Management";
  }

  ngOnInit(): void {}
}
