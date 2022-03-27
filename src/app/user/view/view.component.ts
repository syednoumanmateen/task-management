import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/providers/user.service";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.css"],
})
export class ViewComponent implements OnInit {
  urlParams: any;
  userData: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.urlParams = data;
    });
    console.log(this.urlParams.id);

    this.userView();
  }

  userView() {
    this.userService.viewUser(this.urlParams.id).subscribe(
      (res: any) => {
        this.userData = res.userData;
      },
      (err: any) => {}
    );
  }

  onEdit() {
    console.log(this.urlParams.id);
    
    this.router.navigate(["/add-user"], {
      queryParams: {
        id: this.urlParams.id,
      },
    });
  }
}
