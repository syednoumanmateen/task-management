import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RoleFeaturesComponent } from "./../role-features/role-features.component";
import { DataStorageService } from "src/app/providers/data-storage.service";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/providers/user.service";
import { AppService } from "src/app/providers/app.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-view-role",
  templateUrl: "./view-role.component.html",
  styleUrls: ["./view-role.component.css"],
})
export class ViewRoleComponent implements OnInit {
  urlParams: any;
  userData: any;
  closeResult: any;
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private storage: DataStorageService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.appService.pageTitle = "viewrole - Task Management";
    this.urlParams = "";
    this.userData = {};
    this.closeResult = "";
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data || "";
    });
    this.viewRole();
  }

  viewRole() {
    this.userService.viewRole(this.urlParams.id || "").subscribe(
      (res: any) => {
        this.userData = res || {};
      },
      (err: any) => {
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
    this.open();
  }

  open() {
    this.modalService
      .open(RoleFeaturesComponent, {
        ariaLabelledBy: "modal-basic-title",
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
