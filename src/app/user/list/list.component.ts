import { ToastrService } from "ngx-toastr";
import { AppService } from "src/app/providers/app.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/providers/user.service";
import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "src/app/providers/data-storage.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  userData: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private appService: AppService,
    private toastr: ToastrService,
    private storage: DataStorageService
  ) {
    this.appService.pageTitle = "userList - Task Management";
    this.userData = {};
  }

  ngOnInit(): void {
    this.userList();
  }

  onAddUser() {
    this.router.navigate(["/users/add-user"]);
  }

  userList() {
    this.userService.listUser().subscribe(
      (res: any) => {
        this.userData = res||{};
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    );
  }

  onView(id: any) {
    this.router.navigate(["/users/view-user"], {
      queryParams: {
        id: id,
      },
    });
  }

  onDelete(id: any) {
    this.userService.deleteUser(id).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    );
  }
}
