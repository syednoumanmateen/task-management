import { AddComponent } from "./../add/add.component";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AppService } from "src/app/providers/app.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/providers/user.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { ModalService } from "src/app/providers/modal.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  @ViewChild("BlockMsg") BlockMsg!: ElementRef;
  date: any;
  fName: any;
  user: {
    data: any;
    loading: Boolean;
  };
  role: {
    data: any;
    loading: Boolean;
  };
  delete: {
    loading: Boolean;
  };
  status: Array<any>;
  roleName: any;
  statusValue: any;
  closeResult: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private appService: AppService,
    private toastr: ToastrService,
    private modalService: ModalService
  ) {
    this.appService.pageTitle = "userList - Task Management";
    this.date = "";
    this.user = {
      data: {},
      loading: false,
    };
    this.role = {
      data: {},
      loading: false,
    };
    this.delete = {
      loading: false,
    };
    this.status = this.getStatus();
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
    this.modalService.open(AddComponent);
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
        this.role.data = res || "";
      },
      (err: any) => {
        this.role.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onFilter() {
    console.log(this.date);

    let p = {
      role: this.roleName || "",
      // fName:this.fName||"",
      status: this.statusValue || "",
      startDate: this.date[0] || "",
      endDate: this.date[1] || "",
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
