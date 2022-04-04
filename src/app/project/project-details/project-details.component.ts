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
  project: {
    data: any;
    loading: Boolean;
  };
  task: {
    data: any;
    loading: Boolean;
  };
  delete: {
    loading: Boolean;
  };
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.appService.pageTitle = "projectDetails - Task Management";
    this.urlParams = {};
    this.project = {
      data: {},
      loading: false,
    };
    this.task = {
      data: {},
      loading: false,
    };
    this.delete = {
      loading: false,
    };
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data || "";
    });
    this.viewProject();
  }

  viewProject() {
    this.project.loading = true;
    this.userService.viewProject(this.urlParams.id).subscribe(
      (res: any) => {
        this.project.loading = false;
        this.project.data = res[0] || [];
        this.getTask();
      },
      (err: any) => {
        this.project.loading = false;
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
    this.task.loading = true;
    let p = this.project.data._id;
    this.userService.taskList(p).subscribe(
      (res: any) => {
        this.task.loading = false;
        this.task.data = res || {};
      },
      (err: any) => {
        this.task.loading = false;
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
        id: this.project.data._id,
      },
    });
  }

  onDelete(id: any) {
    this.delete.loading = true;
    this.userService.deleteTask(id).subscribe(
      (res: any) => {
        this.delete.loading = false;
        this.toastr.success(res.data.message);
      },
      (err: any) => {
        this.delete.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }
}
