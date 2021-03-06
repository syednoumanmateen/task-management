import { Directive, ElementRef, Host, Self, Optional, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

const TIMEOUT = 150;

@Directive({
  selector: '[hoverDropdown]' // tslint:disable-line
})
export class HoverDropdownDirective implements OnDestroy, AfterViewInit {
  private timeout: number | null = null;
  private toggle: HTMLElement | null = null;
  private menu: HTMLElement | null = null;
  private hovered = false;
  private subscription: Subscription | null = null;
  private listeners: any = {};

  constructor(private el: ElementRef | null, private zone: NgZone, @Host() @Self() @Optional() private dropdown: NgbDropdown | null) {}

  ngAfterViewInit(): void {
    if (!this.dropdown) { return; }

    this.subscription = this.dropdown.openChange.subscribe(() => {
      // Prevent dropdown close
      if (this.hovered) { this.dropdown?.open(); }
    });

    this.toggle = this.el?.nativeElement.querySelector('.dropdown-toggle');
    this.menu = this.el?.nativeElement.querySelector('.dropdown-menu');

    if (!this.toggle || !this.menu) { return this.ngOnDestroy(); }

    this.listeners = {
      toggleMouseenter: () => this.zone.run(() => {
        this.hovered = true;
        this.open();
      }),
      toggleMouseleave: () => this.zone.run(() => {
        this.hovered = false;
        this.close();
      }),
      menuMouseenter: () => this.zone.run(() => this.open()),
      menuMouseleave: () => this.zone.run(() => this.close())
    };

    this.zone.runOutsideAngular(() => {
      this.toggle?.addEventListener('mouseenter', this.listeners.toggleMouseenter);
      this.toggle?.addEventListener('mouseleave', this.listeners.toggleMouseleave);
      this.menu?.addEventListener('mouseenter', this.listeners.menuMouseenter);
      this.menu?.addEventListener('mouseleave', this.listeners.menuMouseleave);
    });
  }

  ngOnDestroy(): void {
    this.clearCloseTimeout();

    this.zone.runOutsideAngular(() => {
      this.toggle?.removeEventListener('mouseenter', this.listeners.toggleMouseenter);
      this.toggle?.removeEventListener('mouseleave', this.listeners.toggleMouseleave);
      this.menu?.removeEventListener('mouseenter', this.listeners.menuMouseenter);
      this.menu?.removeEventListener('mouseleave', this.listeners.menuMouseleave);
    });

    this.dropdown = null;
    this.toggle = null;
    this.menu = null;
    this.listeners = null;
    this.el = null;
    this.subscription?.unsubscribe();
    this.subscription = null;
  }

  private open(): void {
    this.clearCloseTimeout();
    if (this.isStatic()) { return; }
    this.dropdown?.open();
  }

  private close(): void {
    this.clearCloseTimeout();
    if (this.isStatic()) { return; }

    this.timeout = window.setTimeout(() => {
      this.clearCloseTimeout();
      this.dropdown?.close();
    }, TIMEOUT);
  }

  private isStatic(): boolean {
    return !!this.menu && window.getComputedStyle(this.menu, null).getPropertyValue('position') === 'static';
  }

  private clearCloseTimeout(): void {
    if (!this.timeout) { return; }
    clearTimeout(this.timeout);
    this.timeout = null;
  }
}
