import { AddProjectComponent } from "./../add-project/add-project.component";
import { UserService } from "src/app/providers/user.service";
import { AppService } from "src/app/providers/app.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ModalService } from "src/app/providers/modal.service";
import { AnyCnameRecord } from "dns";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectComponent implements OnInit {
  closeResult: any;
  date: any;
  projectName: any;
  status: any;
  page: number;
  count: number;
  totalPages: number;
  countPages: number;
  project: {
    data: any;
    loading: Boolean;
    filter: any;
    count: any;
  };
  delete: {
    loading: Boolean;
  };
  constructor(
    private router: Router,
    private appService: AppService,
    private userService: UserService,
    private toastr: ToastrService,
    private modalService: ModalService
  ) {
    this.appService.pageTitle = "Project - Task Management";
    this.date = "";
    this.projectName = "";
    this.status = "";
    this.page = 1;
    this.count = 10;
    this.totalPages = 0;
    this.countPages = 0;
    this.project = {
      data: {},
      loading: false,
      filter: {},
      count: {},
    };
    this.delete = {
      loading: false,
    };
  }

  ngOnInit(): void {
    this.getCountProject();
  }

  onCreateProject() {
    this.modalService.open(AddProjectComponent);
  }

  pageChanges() {
    if (!this.project.count) {
      this.getProject();
    } else {
      this.filter();
    }
  }

  onView(id: any) {
    this.router.navigate(["/projects/view-project"], {
      queryParams: {
        id: id || "",
      },
    });
  }

  onRemove(id: any) {
    this.delete.loading = true;
    this.userService.removeProject(id).subscribe(
      (res: any) => {
        this.delete.loading = false;
        this.toastr.success(res.data.message || "");
      },
      (err: any) => {
        this.delete.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  getCountProject() {
    this.project.loading = true;
    this.userService.projectCountList().subscribe(
      (res: any) => {
        this.project.loading = false;
        // this.project.data = res || 0;
        this.totalPages = res;
        this.countPages = Math.ceil(this.totalPages / this.count);
        this.getProject();
      },
      (err: any) => {
        this.project.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  getProject() {
    let p = {
      page: this.page,
      count: this.count,
    };
    this.project.loading = true;
    this.userService.projectList(p).subscribe(
      (res: any) => {
        this.project.loading = false;
        this.project.data = res || {};
        this.project.filter = res || {};
      },
      (err: any) => {
        this.project.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onFilter() {
    let p = {
      project: this.projectName || "",
      status: this.status || "",
      startDate: this.date[0] || "",
      endDate: this.date[1] || "",
      type: "count",
    };
    this.project.loading = true;
    this.userService.filterProject(p).subscribe(
      (res: any) => {
        this.project.loading = false;
        this.project.count = res[0].count;
        this.totalPages = res[0].count;
        this.countPages = Math.ceil(this.totalPages / this.count);
        this.filter();
      },  
      (err: any) => {
        this.project.loading = false;
        this.toastr.error(err.error.message || err.message.message || "");
      }
    );
  }

  filter() {
    let p = {
      page: this.page,
      count: this.count,
      project: this.projectName || "",
      status: this.status || "",
      startDate: this.date[0] || "",
      endDate: this.date[1] || "",
      type: "list",
    };
    this.project.loading = true;
    this.userService.filterProject(p).subscribe(
      (res: any) => {
        this.project.loading = false;
        this.project.data = res || [];
      },
      (err: any) => {
        this.project.loading = false;
        this.toastr.error(err.error.message || err.message.message || "");
      }
    );
  }
}
