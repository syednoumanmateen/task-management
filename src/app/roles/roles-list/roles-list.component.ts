import { AddRoleComponent } from "./../add-role/add-role.component";
import { RoleFeaturesComponent } from "./../role-features/role-features.component";
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
    count: any;
    filter: any;
  };
  delete: {
    loading: Boolean;
  };
  closeResult: any;
  date: any;
  roleName: any;
  page: number;
  count: number;
  totalPages: number;
  countPages: number;
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
      count: {},
      filter: {},
    };
    this.delete = {
      loading: false,
    };
    this.closeResult = "";
    this.date = "";
    this.page = 1;
    this.count = 10;
    this.totalPages = 0;
    this.countPages = 0;
  }

  ngOnInit(): void {
    this.getCountRoles();
  }

  addRole() {
    this.modalService.open(AddRoleComponent);
  }

  pageChanges() {
    if (!this.role.count) {
      this.getRoles();
    } else {
      this.filter();
    }
  }

  getCountRoles() {
    this.role.loading = true;
    this.userService.roleCountList().subscribe(
      (res: any) => {
        this.role.loading = false;
        // this.role.data = res || 0;
        this.totalPages = res;
        this.countPages = Math.ceil(this.totalPages / this.count);
        this.getRoles();
      },
      (err: any) => {
        this.role.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  getRoles() {
    let p = {
      page: this.page,
      count: this.count,
    };
    this.role.loading = true;
    this.userService.roleList(p).subscribe(
      (res: any) => {
        this.role.loading = false;
        this.role.data = res || {};
        this.role.filter = res || {};
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
    let p = {
      role: this.roleName || "",
      startDate: this.date[0] || "",
      endDate: this.date[1] || "",
      type: "count",
    };
    this.role.loading = true;
    this.userService.filterRole(p).subscribe(
      (res: any) => {
        this.role.loading = false;
        this.role.count = res[0].count;
        this.totalPages = res[0].count;
        this.countPages = Math.ceil(this.totalPages / this.count);
        this.filter();
      },
      (err: any) => {
        this.role.loading = false;
        this.toastr.error(err.error.message || err.message.message || "");
      }
    );
  }

  filter() {
    let p = {
      page: this.page,
      count: this.count,
      role: this.roleName || "",
      startDate: this.date[0] || "",
      endDate: this.date[1] || "",
      type: "list",
    };
    this.role.loading = true;
    this.userService.filterRole(p).subscribe(
      (res: any) => {
        this.role.loading = false;
        this.role.data = res || [];
      },
      (err: any) => {
        this.role.loading = false;
        this.toastr.error(err.error.message || err.message.message || "");
      }
    );
  }
}
