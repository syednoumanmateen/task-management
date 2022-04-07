import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RoleFeaturesComponent } from "./../role-features/role-features.component";
import { DataStorageService } from "src/app/providers/data-storage.service";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/providers/user.service";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalService } from "src/app/providers/modal.service";

@Component({
  selector: "app-view-role",
  templateUrl: "./view-role.component.html",
  styleUrls: ["./view-role.component.css"],
})
export class ViewRoleComponent implements OnInit {
  urlParams: any;
  view: {
    data: any;
    loading: Boolean;
  };
  closeResult: any;
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private storage: DataStorageService,
    private modalService: ModalService,
    private router: Router
  ) {
    this.appService.pageTitle = "viewrole - Task Management";
    this.urlParams = "";
    this.view = {
      data: {},
      loading: false,
    };
    this.closeResult = "";
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data || "";
    });
    this.viewRole();
  }

  viewRole() {
    this.view.loading = true;
    this.userService.viewRole(this.urlParams.id || "").subscribe(
      (res: any) => {
        this.view.loading = false;
        this.view.data = res || {};
      },
      (err: any) => {
        this.view.loading = false;
        this.router.navigate(["**"]);
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onEdit(id: any) {
    this.router.navigate(["/roles/add-role"], {
      queryParams: {
        id: id || "",
      },
    });
  }

  viewFeatures(data: any) {
    this.storage.setData("featureList", data);
    this.modalService.open(RoleFeaturesComponent);
  }

  
}
