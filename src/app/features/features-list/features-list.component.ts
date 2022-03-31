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
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private appService: AppService
  ) {
    this.appService.pageTitle = "list of features - Task Management";
    this.userId="";
    this.userData={}
  }

  ngOnInit(): void {
    this.getFeatures();
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
        this.toastr.error(err.error.message||"");
      }
    );
  }

  onView(id: any) {
    this.router.navigate(["/features/view-feature"], {
      queryParams: {
        id: id||"",
      },
    });
  }

  onDelete(id: any) {
    this.userService.deletFeature(id).subscribe(
      (res: any) => {
        this.toastr.success(res.data.message || "");
        this.ngOnInit();
      },
      (err: any) => {
        this.toastr.error(err.error.message||"");
      }
    );
  }
}
