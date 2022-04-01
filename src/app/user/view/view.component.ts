import { ToastrService } from "ngx-toastr";
import { AppService } from "./../../providers/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.css"],
})
export class ViewComponent implements OnInit {
  urlParams: any;
  userData: any;
  resetPassword: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private appService: AppService,
    private toastr: ToastrService
  ) {
    this.appService.pageTitle = "addUser - Task Management";
    this.urlParams = {};
    this.userData = {};
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data || "";
    });
    this.userView();
  }

  userView() {
    this.userService.viewUser(this.urlParams.id).subscribe(
      (res: any) => {
        this.userData = res.userData || {};
      },
      (err: any) => {
        this.router.navigate(["**"]);
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onResetpsw() {
    let p = this.resetPassword;
    this.userService.resetPassword(this.userData.email, p).subscribe(
      (res: any) => {},
      (err: any) => {}
    );
  }

  onEdit() {
    this.router.navigate(["/users/add-user"], {
      queryParams: {
        id: this.urlParams.id || "",
      },
    });
  }
}
