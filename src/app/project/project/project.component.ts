import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCreateProject() {
    this.router.navigate(["/add-project"]);
  }
}