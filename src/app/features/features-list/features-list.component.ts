import { AppService } from "src/app/providers/app.service";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-features-list",
  templateUrl: "./features-list.component.html",
  styleUrls: ["./features-list.component.css"],
})
export class FeaturesListComponent implements OnInit {
  userId: any;
  feature: {
    loading: Boolean;
    data: any;
  };
  delete: {
    loading: Boolean;
  };
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private appService: AppService
  ) {
    this.appService.pageTitle = "list of features - Task Management";
    this.userId = "";
    this.feature = {
      loading: false,
      data: {},
    };
    this.delete = {
      loading: false,
    };
  }

  ngOnInit(): void {
    this.getFeatures();
  }

  addFeature() {
    this.router.navigate(["/features/add-feature"]);
  }

  getFeatures() {
    this.feature.loading = true;
    this.userService.featureList().subscribe(
      (res: any) => {
        this.feature.loading = false;
        this.feature.data = res || {};
      },
      (err: any) => {
        this.feature.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
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
        this.toastr.success(res.message || "");
        this.ngOnInit();
      },
      (err: any) => {
        this.delete.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }
}
