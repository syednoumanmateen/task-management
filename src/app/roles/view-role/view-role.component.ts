import { DataStorageService } from "src/app/providers/data-storage.service";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/providers/user.service";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-view-role",
  templateUrl: "./view-role.component.html",
  styleUrls: ["./view-role.component.css"],
})
export class ViewRoleComponent implements OnInit {
  urlParams: any;
  userData: any;
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private storage: DataStorageService,
    private router: Router
  ) {
    this.appService.pageTitle = "viewrole - Task Management";
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data;
    });
    this.viewRole();
  }

  viewRole() {
    this.userService.viewRole(this.urlParams.id || "").subscribe(
      (res: any) => {
        this.userData = res;
      },
      (err: any) => {
        this.router.navigate(["**"]);
        this.toastr.error(err.error.message);
      }
    );
  }

  viewFeatures(data: any) {
    this.storage.setData("featureList", data);
    this.router.navigate(["/features"]);
  }

  onEdit() {}
}
