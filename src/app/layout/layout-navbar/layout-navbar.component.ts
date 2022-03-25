import { AuthService } from "./../../providers/auth.service";
import { Component, Input, HostBinding } from "@angular/core";
import { AppService } from "../../providers/app.service";
import { LayoutService } from "../../layout/layout.service";

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
    private authService: AuthService
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
    this.authService.isLogOut();
  }
}
