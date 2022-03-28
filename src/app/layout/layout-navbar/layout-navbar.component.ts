import { Router } from "@angular/router";
import { UserService } from "./../../providers/user.service";
import { Component, Input, HostBinding } from "@angular/core";
import { AppService } from "../../providers/app.service";
import { LayoutService } from "../../layout/layout.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-layout-navbar",
  templateUrl: "./layout-navbar.component.html",
  styles: [":host { display: block; }"],
})
export class LayoutNavbarComponent {
  isExpanded = false;
  isRTL: boolean;

  @Input() sidenavToggle = true;

  @HostBinding("class.layout-navbar") hostClassMain = true;

  constructor(
    private appService: AppService,
    private layoutService: LayoutService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.isRTL = appService.isRTL;
  }

  currentBg(): string {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav(): void {
    this.layoutService.toggleCollapsed();
  }

  OnLogOut() {
    this.userService.userLogout().subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.router.navigate(["/login"]);
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    );
  }
}
