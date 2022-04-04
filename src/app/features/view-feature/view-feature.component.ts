import { ToastrService } from "ngx-toastr";
import { AppService } from "src/app/providers/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";

@Component({
  selector: "app-view-feature",
  templateUrl: "./view-feature.component.html",
  styleUrls: ["./view-feature.component.css"],
})
export class ViewFeatureComponent implements OnInit {
  urlParams: any;
  userData: any;
  loading:Boolean
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private appService: AppService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.appService.pageTitle = "viewfeature - Task Management";
    this.urlParams = {};
    this.userData = {};
    this.loading = false;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data || "";
    });
    this.getfeatures();
  }

  getfeatures() {
    this.loading = true;
    this.userService.viewFeature(this.urlParams.id).subscribe(
      (res: any) => {
        this.loading = false;
        this.userData = res || {};
      },
      (err: any) => {
        this.loading = false;
        this.router.navigate(["**"]);
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onEdit(id: any) {
    this.router.navigate(["/features/add-feature"], {
      queryParams: {
        id: id || "",
      },
    });
  }
}
