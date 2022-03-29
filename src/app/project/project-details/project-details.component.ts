import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/providers/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.css"],
})
export class ProjectDetailsComponent implements OnInit {
  curOpt = "high";
  urlParams: any;
  userData: any;
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.appService.pageTitle = "projectDetails - Task Management";
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data;
    });
    this.viewProject();
  }

  viewProject() {
    this.userService.viewProject(this.urlParams.id).subscribe(
      (res: any) => {
        this.userData = res[0];
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  onEdit(id: any) {
    this.router.navigate(["/projects/add-project"], {
      queryParams: {
        id: id,
      },
    });
  }
}
