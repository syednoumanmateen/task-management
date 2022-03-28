import { ToastrService } from "ngx-toastr";
import { AppService } from "src/app/providers/app.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";

@Component({
  selector: "app-view-feature",
  templateUrl: "./view-feature.component.html",
  styleUrls: ["./view-feature.component.css"],
})
export class ViewFeatureComponent implements OnInit {
  urlParams: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private appService: AppService,
    private toastr: ToastrService
  ) {
    this.appService.pageTitle = "viewfeature - Task Management";
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data;
    });
    this.getfeatures();
  }

  getfeatures() {
    this.userService.viewFeature(this.urlParams.id).subscribe(
      (res: any) => {},
      (err: any) => {
        this.toastr.error(err.message);
      }
    );
  }
}
