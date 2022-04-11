import { AddFeatureComponent } from "./../add-feature/add-feature.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AppService } from "src/app/providers/app.service";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-features-list",
  templateUrl: "./features-list.component.html",
  styleUrls: ["./features-list.component.css"],
})
export class FeaturesListComponent implements OnInit {
  userId: any;
  closeResult: any;
  date: any;
  featureName: any;
  moduleName: any;
  feature: {
    loading: Boolean;
    data: any;
  };
  delete: {
    loading: Boolean;
  };

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private appService: AppService,
    private modalService: NgbModal
  ) {
    this.appService.pageTitle = "list of features - Task Management";
    this.userId = "";
    this.date=""
    this.feature = {
      loading: false,
      data: {},
    };
    this.delete = {
      loading: false,
    };
  }

  ngOnInit(): void {
    this.getFeatures();
  }

  addFeature() {
    this.open(AddFeatureComponent);
  }

  getFeatures() {
    this.feature.loading = true;
    this.userService.featureList().subscribe(
      (res: any) => {
        this.feature.loading = false;
        this.feature.data = res || {};
      },
      (err: any) => {
        this.feature.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  onView(id: any) {
    this.router.navigate(["/features/view-feature"], {
      queryParams: {
        id: id || "",
      },
    });
  }

  onDelete(id: any) {
    this.delete.loading = true;
    this.userService.deletFeature(id).subscribe(
      (res: any) => {
        this.delete.loading = false;
        this.toastr.success(res.message || "");
        this.ngOnInit();
      },
      (err: any) => {
        this.delete.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  open(data: any) {
    this.modalService
      .open(data, {
        windowClass: "modal-top modal-lg",
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

  onFilter() {
    console.log("kinj");
    console.log(this.date);
    
    let p = {
      featureName: this.featureName || "",
      moduleName: this.moduleName || "",
      startDate: this.date[0] ||"",
      endDate: this.date[1] ||"",
    };
    this.feature.loading = true;
    this.userService.filterFeature(p).subscribe(
      (res: any) => {
        this.feature.loading = false;
        this.feature.data = res || {};
      },
      (err: any) => {
        this.feature.loading = false;
        this.toastr.error(err.error.message||err.message.message ||"");
      }
    );
  }
}
