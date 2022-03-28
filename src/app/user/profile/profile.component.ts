import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  constructor(private appService: AppService) {
    this.appService.pageTitle = "profile - Task Management";
  }

  ngOnInit(): void {}
}
