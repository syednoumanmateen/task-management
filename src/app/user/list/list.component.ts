import { FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AppService } from "src/app/providers/app.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/providers/user.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DataStorageService } from "src/app/providers/data-storage.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  @ViewChild("BlockMsg") BlockMsg!: ElementRef;
  userData: any;
  formGroup: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private appService: AppService,
    private toastr: ToastrService,
    private storage: DataStorageService
  ) {
    this.appService.pageTitle = "userList - Task Management";
    this.userData = {};
    this.formGroup = this.getFormGroup();
  }

  ngOnInit(): void {
    this.userList();
  }

  getFormGroup() {
    let fg = new FormGroup({
      created: new FormControl(""),
      role: new FormControl(""),
      status: new FormControl(""),
    });
    return fg;
  }

  onAddUser() {
    this.router.navigate(["/users/add-user"]);
  }

  userList() {
    this.userService.listUser().subscribe(
      (res: any) => {
        this.userData = res || {};
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

  onBlock(id: any) {}

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

  onFilter() {
    // let fg = this.formGroup.value;
    // let role = fg.role;
    // let status = fg.status;
    // let date = fg.created;
    // this.userService.filterRole(role).subscribe(
    //   (res: any) => {
    //     console.log(res);
    //   },
    //   (err: any) => {}
    // );
    // this.userService.filterStatus(status).subscribe(
    //   (res: any) => {
    //     console.log(res);
    //   },
    //   (err: any) => {}
    // );
    // this.userService.filterDate(date).subscribe(
    //   (res: any) => {
    //     console.log(res);
    //   },
    //   (err: any) => {}
    // );
  }
}
