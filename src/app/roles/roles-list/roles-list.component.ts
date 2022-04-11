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
import { ModalService } from "src/app/providers/modal.service";

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
  date: any;
  roleName: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private appService: AppService,
    private modalService: ModalService,
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
  }

  ngOnInit(): void {
    this.getRoles();
  }

  addRole() {
    this.modalService.open(AddRoleComponent);
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
    this.modalService.open(RoleFeaturesComponent);
  }

  onFilter() {
    console.log("oidjkd");
    console.log(this.date);

    let p = {
      roleName: this.roleName || "",
      startDate: this.date[0] || {},
      endDate: this.date[1] || {},
    };
    this.role.loading = true;
    this.userService.filterRole(p).subscribe(
      (res: any) => {
        this.role.loading = false;
        this.role.data = res || {};
      },
      (err: any) => {
        this.role.loading = false;
        this.toastr.error(err.error.message||err.message.message ||"");
      }
    );
  }
}
