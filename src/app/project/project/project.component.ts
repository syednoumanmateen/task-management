import { AddProjectComponent } from "./../add-project/add-project.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/providers/user.service";
import { AppService } from "src/app/providers/app.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

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
  project: {
    data: any;
    loading: Boolean;
  };
  delete: {
    loading: Boolean;
  };
  constructor(
    private router: Router,
    private appService: AppService,
    private userService: UserService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.appService.pageTitle = "Project - Task Management";
    this.date = "";
    this.projectName = "";
    this.status = "";
    this.project = {
      data: {},
      loading: false,
    };
    this.delete = {
      loading: false,
    };
  }

  ngOnInit(): void {
    this.getProject();
  }

  onCreateProject() {
    this.open();
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

  getProject() {
    this.project.loading = true;
    this.userService.projectList().subscribe(
      (res: any) => {
        this.project.loading = false;
        this.project.data = res || {};
      },
      (err: any) => {
        this.project.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  open() {
    this.modalService
      .open(AddProjectComponent, {
        windowClass: "modal-top modal-lg",
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
