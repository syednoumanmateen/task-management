import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.css"],
})
export class ProjectDetailsComponent implements OnInit {
  curOpt = "high";
  constructor() {}

  ngOnInit(): void {}
}
