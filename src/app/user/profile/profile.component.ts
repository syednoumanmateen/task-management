import { ToastrService } from "ngx-toastr";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "src/app/providers/data-storage.service";
import { UserService } from "src/app/providers/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  userId: any;
  user: {
    data: any;
    loading: Boolean;
  };
  constructor(
    private appService: AppService,
    private storage: DataStorageService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.appService.pageTitle = "profile - Task Management";
    this.user = {
      data: {},
      loading: false,
    };
  }

  ngOnInit(): void {
    this.userId = this.storage.getToken("userId");
    this.userView();
  }

  userView() {
    this.user.loading = true;
    this.userService.viewUser(this.userId).subscribe(
      (res: any) => {
        this.user.loading = false;
        this.user.data = res.userData || {};
      },
      (err: any) => {
        this.user.loading = false;
        this.router.navigate(["**"]);
        this.toastr.error(err.error.message || "");
      }
    );
  }
}
