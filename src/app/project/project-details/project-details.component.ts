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
  taskData: any;
  loading: Boolean;
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.appService.pageTitle = "projectDetails - Task Management";
    this.urlParams = {};
    this.userData = {};
    this.loading = false;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data || "";
    });
    this.viewProject();
  }

  viewProject() {
    this.loading = true;
    this.userService.viewProject(this.urlParams.id).subscribe(
      (res: any) => {
        this.loading = false;
        this.userData = res[0] || [];
        this.getTask();
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onEdit(id: any) {
    this.router.navigate(["/projects/add-project"], {
      queryParams: {
        id: id || "",
      },
    });
  }

  getTask() {
    this.loading = true;
    let p = this.userData._id;
    this.userService.taskList(p).subscribe(
      (res: any) => {
        this.loading = false;
        this.taskData = res || {};
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onView(id: any) {
    this.router.navigate(["/tasks/view-task"], {
      queryParams: {
        id: id,
      },
    });
  }

  onAddTask() {
    this.router.navigate(["/tasks/add-task"], {
      queryParams: {
        id: this.userData._id,
      },
    });
  }

  onDelete(id: any) {
    this.loading = true;
    this.userService.deleteTask(id).subscribe(
      (res: any) => {
        this.loading = false;
        this.toastr.success(res.data.message);
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }
}
