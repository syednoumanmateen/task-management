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
  userData: any;
  loading:Boolean
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private appService: AppService
  ) {
    this.appService.pageTitle = "list of features - Task Management";
    this.userId = "";
    this.userData = {};
    this.loading = false;
  }

  ngOnInit(): void {
    this.getFeatures();
  }

  addFeature() {
    this.router.navigate(["/features/add-feature"]);
  }

  getFeatures() {
    this.loading = true;
    this.userService.featureList().subscribe(
      (res: any) => {
        this.loading = false;
        this.userData = res || {};
      },
      (err: any) => {
        this.loading = false;
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
    this.loading = true;
    this.userService.deletFeature(id).subscribe(
      (res: any) => {
        this.loading = false;
        this.toastr.success(res.message || "");
        this.ngOnInit();
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }
}
