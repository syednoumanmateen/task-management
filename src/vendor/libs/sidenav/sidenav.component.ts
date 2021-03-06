import {
  Component, ElementRef, Input, OnDestroy, NgZone, ChangeDetectorRef, AfterViewInit, HostBinding, Output, EventEmitter
} from '@angular/core';

import PerfectScrollbar from 'perfect-scrollbar';
const SideNav = require('./sidenav.js').SideNav;

@Component({
  selector: 'sidenav', // tslint:disable-line
  exportAs: 'sidenav',
  template: '<ng-content></ng-content>',
  styleUrls: ['../ngx-perfect-scrollbar/ngx-perfect-scrollbar.scss']
})
export class SidenavComponent implements AfterViewInit, OnDestroy {
  public sidenav: any;

  @Input() orientation = 'vertical';
  @Input() animate = true;
  @Input() accordion = true;
  @Input() closeChildren = false;
  @Input() showDropdownOnHover = false;

  @Input() onOpen: any;
  @Input() onOpened: any;
  @Input() onClose: any;
  @Input() onClosed: any;

  @Output() destroy = new EventEmitter<SidenavComponent>();

  @HostBinding('class.sidenav') hostClassMain = true;
  @HostBinding('class.sidenav-horizontal') hostClassHorizontal = false;
  @HostBinding('class.sidenav-vertical') hostClassVertical = false;

  constructor(private el: ElementRef| null, private zone: NgZone, private ref: ChangeDetectorRef) {
    this.ref.detach();

    // Set host classes
    this.hostClassHorizontal = this.orientation === 'horizontal';
    this.hostClassVertical = !this.hostClassHorizontal;
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.sidenav = new SideNav(this.el?.nativeElement, {
        orientation: this.orientation,
        animate: this.animate,
        accordion: this.accordion,
        closeChildren: this.closeChildren,
        showDropdownOnHover: this.showDropdownOnHover,

        onOpen: this.onOpen,
        onOpened: this.onOpened,
        onClose: this.onClose,
        onClosed: this.onClosed
      }, PerfectScrollbar);
    });
  }

  ngOnDestroy(): void {
    this.destroy.emit(this);
    if (this.sidenav) { this.zone.runOutsideAngular(() => this.sidenav.destroy()); }
    this.sidenav = null;
    this.el = null;
  }
}
