import { Router } from "@angular/router";
import { UserService } from "./../../providers/user.service";
import { Component, Input, HostBinding } from "@angular/core";
import { AppService } from "../../providers/app.service";
import { LayoutService } from "../../layout/layout.service";
import { ToastrService } from "ngx-toastr";
import { DataStorageService } from "src/app/providers/data-storage.service";

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
    private storage: DataStorageService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.isRTL = appService.isRTL;
  }

  currentBg(): string {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav(): void {
    this.layoutService.toggleCollapsed();
  }

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  OnLogOut() {
    this.userService.userLogout().subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.storage.removeToken();
        this.router.navigate(["/login"]);
      },
      (err: any) => {
        this.toastr.error(err.message);
      }
    );
  }
}
