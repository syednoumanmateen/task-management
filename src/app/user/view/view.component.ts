import { ModalService } from "src/app/providers/modal.service";
import { AddComponent } from "./../add/add.component";
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
  user: {
    data: any;
    loading: Boolean;
  };
  psw: {
    loading: Boolean;
  };
  resetPassword: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private appService: AppService,
    private toastr: ToastrService,
    private modalService: ModalService
  ) {
    this.appService.pageTitle = "addUser - Task Management";
    this.urlParams = {};
    this.user = {
      data: {},
      loading: false,
    };
    this.psw = {
      loading: false,
    };
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data || "";
    });
    this.userView();
  }

  userView() {
    this.user.loading = true;
    this.userService.viewUser(this.urlParams.id).subscribe(
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

  onResetpsw() {
    let p = this.resetPassword;
    this.psw.loading = true;
    this.userService.resetPassword(this.user.data.email, p).subscribe(
      (res: any) => {
        this.psw.loading = false;
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.psw.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  onEdit() {
    this.modalService.open(AddComponent);
  }
}
