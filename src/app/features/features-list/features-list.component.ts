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
  count: number;
  page: number;
  totalPages: number;
  countPages: number;
  feature: {
    loading: Boolean;
    data: any;
    filter: any;
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
    this.date = "";
    this.count = 10;
    this.totalPages = 0;
    this.countPages = 0;
    this.page = 1;
    this.feature = {
      loading: false,
      data: {},
      filter: {},
    };
    this.delete = {
      loading: false,
    };
  }

  ngOnInit(): void {
    this.getCountFeatures();
  }

  addFeature() {
    this.open(AddFeatureComponent);
  }

  pageChanges() {
    this.getFeatures();
  }

  getCountFeatures() {
    this.feature.loading = true;
    this.userService.featureCount().subscribe(
      (res: any) => {
        this.feature.loading = false;
        // this.feature.data = res || 0;
        this.totalPages = res;
        this.countPages = Math.ceil(this.totalPages / this.count);
        this.getFeatures();
      },
      (err: any) => {
        this.feature.loading = false;
        this.toastr.error(err.error.message || "");
      }
    );
  }

  getFeatures() {
    let p = {
      page: this.page,
      count: this.count,
    };
    this.feature.loading = true;
    this.userService.featureList(p).subscribe(
      (res: any) => {
        this.feature.loading = false;
        this.feature.data = res || {};
        this.feature.filter = res || {};
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
    let p = {
      feature: this.featureName || "",
      module: this.moduleName || "",
      startDate: this.date[0] || "",
      endDate: this.date[1] || "",
    };
    this.feature.loading = true;
    this.userService.filterFeature(p).subscribe(
      (res: any) => {
        this.feature.loading = false;
        this.feature.data = res || {};
      },
      (err: any) => {
        this.feature.loading = false;
        this.toastr.error(err.error.message || err.message.message || "");
      }
    );
  }
}
