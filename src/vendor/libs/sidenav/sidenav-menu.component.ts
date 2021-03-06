import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'sidenav-menu', // tslint:disable-line
  template: `
<a href="#" class="sidenav-link sidenav-toggle" [ngClass]="linkClass">
  <i class="sidenav-icon" *ngIf="icon" [ngClass]="icon"></i>
  <div [innerHTML]="text"></div>
  <div *ngIf="badge" class="ml-auto pl-1"><div class="badge" [ngClass]="badgeClass">{{badge}}</div></div>
</a>
<div class="sidenav-menu">
  <ng-content></ng-content>
</div>
  `
})
export class SidenavMenuComponent {
  @HostBinding('class.sidenav-item') hostClassMain = true;
  @HostBinding('class.d-block') hostClassBlock = true;

  @Input() text = '';
  @Input() icon = '';
  @Input() linkClass = '';
  @Input() badge: any = null;
  @Input() badgeClass = '';
  @Input() @HostBinding('class.disabled') disabled = false;
  @Input() @HostBinding('class.active') active = false;
  @Input() @HostBinding('class.open') open = false;
}
