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
  userData: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private storage: DataStorageService,
    private appService: AppService
  ) {
    this.appService.pageTitle = "list of role - Task Management";
  }

  ngOnInit(): void {
    this.getRoles();
  }

  addRole() {
    this.router.navigate(["/roles/add-role"]);
  }

  getRoles() {
    this.userService.roleList().subscribe(
      (res: any) => {
        this.userData = res;
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    );
  }

  onView(id: any) {
    this.router.navigate(["/roles/view-role"], {
      queryParams: {
        id: id,
      },
    });
  }

  onDelete(id: any) {
    this.userService.deletRole(id).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    );
  }

  viewFeatures(data: any) {
    this.storage.setData("featureList", data);
    this.router.navigate(["/features"]);
  }
}
