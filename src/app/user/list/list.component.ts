import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AppService } from "src/app/providers/app.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/providers/user.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  @ViewChild("BlockMsg") BlockMsg!: ElementRef;
  userData: any;
  role: any;
  status: Array<any>;
  roleValue: string;
  statusValue: string;
  date: any;
  loading:Boolean;
  constructor(
    private userService: UserService,
    private router: Router,
    private appService: AppService,
    private toastr: ToastrService,
    private modelService: NgbModal
  ) {
    this.appService.pageTitle = "userList - Task Management";
    this.userData = {};
    this.status = this.getStatus();
    this.roleValue = "";
    this.statusValue = "";
    this.role = {};
    this.loading = false;
  }

  ngOnInit(): void {
    this.userList();
    this.getRoles();
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

  onAddUser() {
    this.router.navigate(["/users/add-user"]);
  }

  userList() {
    this.loading = true;
    this.userService.listUser().subscribe(
      (res: any) => {
        this.loading = false;
        this.userData = res || {};
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message || "");
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
    this.loading = true;
    this.userService.deleteUser(id).subscribe(
      (res: any) => {
        this.loading = false;
        this.toastr.success(res.data.message || "");
        this.ngOnInit();
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  getRoles() {
    this.loading = true;
    this.userService.roleList().subscribe(
      (res: any) => {
        this.loading = false;
        this.role = res || "";
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onFilter() {
    let p = {
      role: this.roleValue || "",
      status: this.statusValue || "",
      startDate: this.date[0] || {},
      endDate: this.date[1] || {},
    };
    this.loading = true;
    this.userService.filterUser(p).subscribe(
      (res: any) => {
        this.loading = false;
        this.userData = res || {};
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.message.message || err.error.message || "");
      }
    );
  }
}
