import { AppService } from "src/app/providers/app.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DataStorageService } from "src/app/providers/data-storage.service";
import { UserService } from "src/app/providers/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-role-features",
  templateUrl: "./role-features.component.html",
  styleUrls: ["./role-features.component.css"],
})
export class RoleFeaturesComponent implements OnInit {
  userData: any;
  delete: {
    loading: Boolean;
  };
  constructor(
    private userService: UserService,
    private storage: DataStorageService,
    private toastr: ToastrService,
    private router: Router,
    private appService: AppService
  ) {
    this.appService.pageTitle = "list of features - Task Management";
    this.userData = {};
    this.delete = {
      loading: false,
    };
  }

  ngOnInit(): void {
    this.userData = this.storage.getData("featureList" || {});
  }

  onView(id: any) {
    this.router.navigate(["/features/view-feature"], {
      queryParams: {
        id: id || "",
      },
    });
  }

  onDelete(id: any) {
    this.delete.loading = true;
    this.userService.deletFeature(id).subscribe(
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
}
