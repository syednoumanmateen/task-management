import { AppService } from "src/app/providers/app.service";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "src/app/providers/data-storage.service";
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
  roleData: any;
  constructor(
    private userService: UserService,
    private storage: DataStorageService,
    private toastr: ToastrService,
    private router: Router,
    private appService: AppService
  ) {
    this.appService.pageTitle = "list of features - Task Management";
  }

  ngOnInit(): void {
    this.getFeatures();
    this.roleData = this.storage.getData("featureList");
  }

  addFeature() {
    this.router.navigate(["/features/add-feature"]);
  }

  getFeatures() {
    this.userService.featureList().subscribe(
      (res: any) => {
        this.userData = res || {};
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  onView(id: any) {
    this.router.navigate(["/features/view-feature"], {
      queryParams: {
        id: id,
      },
    });
  }

  onDelete(id: any) {
    this.userService.deletFeature(id).subscribe(
      (res: any) => {
        this.toastr.success(res.message || "");
      },
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
