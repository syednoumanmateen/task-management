import { ToastrService } from "ngx-toastr";
import { AppService } from "src/app/providers/app.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectComponent implements OnInit {
  userData: any;
  loading:Boolean
  constructor(
    private router: Router,
    private appService: AppService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.appService.pageTitle = "Project - Task Management";
    this.userData || {};
    this.loading = false;
  }

  ngOnInit(): void {
    this.getProject();
  }

  onCreateProject() {
    this.router.navigate(["/projects/add-project"]);
  }

  onView(id: any) {
    this.router.navigate(["/projects/view-project"], {
      queryParams: {
        id: id || "",
      },
    });
  }

  onRemove(id: any) {
    this.loading = true;
    this.userService.removeProject(id).subscribe(
      (res: any) => {
        this.loading = false;
        this.toastr.success(res.data.message || "");
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  getProject() {
    this.loading = true;
    this.userService.projectList().subscribe(
      (res: any) => {
        this.loading = false;
        this.userData = res || {};
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }
}
