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
  role: Array<any>;
  status: Array<any>;
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
    this.role = this.getRole();
    this.status = this.getStatus();
  }

  ngOnInit(): void {
    this.userList();
  }

  getRole() {
    return [
      {
        title: "Any",
        value: "",
      },
      {
        title: "User",
        value: "User",
      },
      {
        title: "Developer",
        value: "Developer",
      },
      {
        title: "Tester",
        value: "Tester",
      },
      {
        title: "Admin",
        value: "Admin",
      },
    ];
  }

  getStatus() {
    return [
      {
        title: "Any",
        value: "",
      },
      {
        title: "Active",
        value: "Active",
      },
      {
        title: "Created",
        value: "Created",
      },
      {
        title: "Blocked",
        value: "Blocked",
      },
    ];
  }

  getFormGroup() {
    let fg = new FormGroup({
      startDate: new FormControl(""),
      endDate: new FormControl(""),
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
    let fg = this.formGroup.value;
    let p = {
      role: fg.role,
      status: fg.status,
      startDate: fg.startDate,
      endDate: fg.endDate,
    };
    this.userService.filterUser(p).subscribe(
      (res: any) => {
        this.userData = res;
      },
      (err: any) => {}
    );
  }
}
