import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class LayoutService {
  constructor(private zone: NgZone) {}

  private get layoutHelpers(): any {
    return (window as any).layoutHelpers;
  }

  private exec<T = void>(fn: () => any): T {
    return this.layoutHelpers && this.zone.runOutsideAngular(fn);
  }

  public getLayoutSidenav(): HTMLElement | null {
    return this.exec<HTMLElement | null>(() => this.layoutHelpers.getLayoutSidenav()) || null;
  }

  public getSidenav(): HTMLElement | null {
    return this.exec<HTMLElement | null>(() => this.layoutHelpers.getSidenav()) || null;
  }

  public getLayoutNavbar(): HTMLElement | null {
    return this.exec<HTMLElement | null>(() => this.layoutHelpers.getLayoutNavbar()) || null;
  }

  public getLayoutFooter(): HTMLElement | null {
    return this.exec<HTMLElement | null>(() => this.layoutHelpers.getLayoutFooter()) || null;
  }

  public getLayoutContainer(): HTMLElement | null {
    return this.exec<HTMLElement | null>(() => this.layoutHelpers.getLayoutContainer()) || null;
  }

  public isSmallScreen(): boolean {
    return this.exec<boolean>(() => this.layoutHelpers.isSmallScreen());
  }

  public isLayout1(): boolean {
    return this.exec<boolean>(() => this.layoutHelpers.isLayout1());
  }

  public isCollapsed(): boolean {
    return this.exec<boolean>(() => this.layoutHelpers.isCollapsed());
  }

  public isFixed(): boolean {
    return this.exec<boolean>(() => this.layoutHelpers.isFixed());
  }

  public isOffcanvas(): boolean {
    return this.exec<boolean>(() => this.layoutHelpers.isOffcanvas());
  }

  public isNavbarFixed(): boolean {
    return this.exec<boolean>(() => this.layoutHelpers.isNavbarFixed());
  }

  public isFooterFixed(): boolean {
    return this.exec<boolean>(() => this.layoutHelpers.isFooterFixed());
  }

  public isReversed(): boolean {
    return this.exec<boolean>(() => this.layoutHelpers.isReversed());
  }

  public setCollapsed(collapsed: boolean, animate = true): void {
    this.exec(() => this.layoutHelpers.setCollapsed(collapsed, animate));
  }

  public toggleCollapsed(animate = true): void {
    this.exec(() => this.layoutHelpers.toggleCollapsed(animate));
  }

  public setPosition(fixed: boolean, offcanvas: boolean): void {
    this.exec(() => this.layoutHelpers.setPosition(fixed, offcanvas));
  }

  public setNavbarFixed(fixed: boolean): void {
    this.exec(() => this.layoutHelpers.setNavbarFixed(fixed));
  }

  public setFooterFixed(fixed: boolean): void {
    this.exec(() => this.layoutHelpers.setFooterFixed(fixed));
  }

  public setReversed(reversed: boolean): void {
    this.exec(() => this.layoutHelpers.setReversed(reversed));
  }

  public update(): void {
    this.exec(() => this.layoutHelpers.update());
  }

  public setAutoUpdate(enable: boolean): void {
    this.exec(() => this.layoutHelpers.setAutoUpdate(enable));
  }

  public on(event: string, callback: () => void): void {
    this.exec(() => this.layoutHelpers.on(event, callback));
  }

  public off(event: string): void {
    this.exec(() => this.layoutHelpers.off(event));
  }

  public init(): void {
    this.exec(() => this.layoutHelpers.init());
  }

  public destroy(): void {
    this.exec(() => this.layoutHelpers.destroy());
  }

  // Internal
  //

  public _redrawLayoutSidenav(): void {
    this.exec(() => this.layoutHelpers._redrawLayoutSidenav());
  }

  public _removeClass(cls: string): void {
    this.exec(() => this.layoutHelpers._removeClass(cls));
  }
}
