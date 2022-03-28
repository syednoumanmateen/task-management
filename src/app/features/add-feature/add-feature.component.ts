import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-feature",
  templateUrl: "./add-feature.component.html",
  styleUrls: ["./add-feature.component.css"],
})
export class AddFeatureComponent implements OnInit {
  constructor(private appService: AppService) {
    this.appService.pageTitle = "addfeature - Task Management";
  }

  ngOnInit(): void {}
}
