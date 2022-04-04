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
  user: {
    data: any;
    loading: Boolean;
  };
  role: {
    data: any;
    loading: Boolean;
  };
  delete:{
    loading:Boolean
  }
  status: Array<any>;
  roleValue: string;
  statusValue: string;
  date: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private appService: AppService,
    private toastr: ToastrService,
    private modelService: NgbModal
  ) {
    this.appService.pageTitle = "userList - Task Management";
    this.user = {
      data: {},
      loading: false,
    };
    this.role = {
      data: {},
      loading: false,
    };
    this.delete={
      loading:false
    }
    this.status = this.getStatus();
    this.roleValue = "";
    this.statusValue = "";
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
    this.user.loading = true;
    this.userService.listUser().subscribe(
      (res: any) => {
        this.user.loading = false;
        this.user.data = res || {};
      },
      (err: any) => {
        this.user.loading = false;
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
    this.delete.loading = true;
    this.userService.deleteUser(id).subscribe(
      (res: any) => {
        this.delete.loading = false;
        this.toastr.success(res.data.message || "");
        this.ngOnInit();
      },
      (err: any) => {
        this.delete.loading = false;
        this.toastr.error(err.error.message);
      }
    );
  }

  getRoles() {
    this.role.loading = true;
    this.userService.roleList().subscribe(
      (res: any) => {
        this.role.loading = false;
        this.role = res || "";
      },
      (err: any) => {
        this.role.loading = false;
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
    this.user.loading = true;
    this.userService.filterUser(p).subscribe(
      (res: any) => {
        this.user.loading = false;
        this.user.data = res || {};
      },
      (err: any) => {
        this.user.loading = false;
        this.toastr.error(err.message.message || err.error.message || "");
      }
    );
  }
}
