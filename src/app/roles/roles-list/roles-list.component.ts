import { AddRoleComponent } from "./../add-role/add-role.component";
import { logging } from "protractor";
import { RoleFeaturesComponent } from "./../role-features/role-features.component";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "src/app/providers/app.service";
import { DataStorageService } from "src/app/providers/data-storage.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";

@Component({
  selector: "app-roles-list",
  templateUrl: "./roles-list.component.html",
  styleUrls: ["./roles-list.component.css"],
})
export class RolesListComponent implements OnInit {
  role: {
    data: any;
    loading: Boolean;
  };
  delete: {
    loading: Boolean;
  };
  closeResult: any;
  roleFilter: string;
  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private appService: AppService,
    private modalService: NgbModal,
    private storage: DataStorageService
  ) {
    this.appService.pageTitle = "list of role - Task Management";
    this.role = {
      data: {},
      loading: false,
    };
    this.delete = {
      loading: false,
    };
    this.closeResult = "";
    this.roleFilter = "";
  }

  ngOnInit(): void {
    this.getRoles();
  }

  addRole() {
    this.open(AddRoleComponent);
  }

  getRoles() {
    this.role.loading = true;
    this.userService.roleList().subscribe(
      (res: any) => {
        this.role.loading = false;
        this.role.data = res || "";
      },
      (err: any) => {
        this.role.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onView(id: any) {
    this.router.navigate(["/roles/view-role"], {
      queryParams: {
        id: id || "",
      },
    });
  }

  onDelete(id: any) {
    this.delete.loading = true;
    this.userService.deletRole(id).subscribe(
      (res: any) => {
        this.delete.loading = false;
        this.toastr.success(res.data.message || "");
        this.ngOnInit();
      },
      (err: any) => {
        this.delete.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  viewFeatures(data: any) {
    this.storage.setData("featureList", data || {});
    this.open(RoleFeaturesComponent);
  }

  open(data: any) {
    this.modalService
      .open(data, {
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
