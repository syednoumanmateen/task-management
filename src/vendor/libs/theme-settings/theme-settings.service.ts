import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class ThemeSettingsService {
  constructor(private zone: NgZone) {}

  private get themeSettings(): any {
    return (window as any).themeSettings;
  }

  private exec<T = void>(fn: () => T): T {
    return this.themeSettings && this.zone.runOutsideAngular(fn);
  }

  get options(): ThemeSettingsOptions {
    return (this.themeSettings && this.themeSettings.settings) || {};
  }

  getOption<T = any>(name: string): T | null {
    return (this.options as any)[name] || null;
  }

  setRtl(rtl: boolean): void {
    this.exec(() => this.themeSettings.setRtl(rtl));
  }

  setStyle(style: ThemeSettingsStyle): void {
    this.exec(() => this.themeSettings.setStyle(style));
  }

  setTheme(themeName: string, updateStorage = true, cb: null | (() => any) = null): void {
    this.exec(() => this.themeSettings.setTheme(themeName, updateStorage, cb));
  }

  isLightStyle(): boolean {
    return this.exec<boolean>(() => this.themeSettings.isLightStyle());
  }

  isMaterialStyle(): boolean {
    return this.exec<boolean>(() => this.themeSettings.isMaterialStyle());
  }

  isDarkStyle(): boolean {
    return this.exec<boolean>(() => this.themeSettings.isDarkStyle());
  }

  setLayoutPosition(pos: 'static' | 'static-offcanvas' | 'fixed' | 'fixed-offcanvas', updateStorage = true): void {
    this.exec(() => this.themeSettings.setLayoutPosition(pos, updateStorage));
  }

  setLayoutNavbarFixed(fixed: boolean, updateStorage = true): void {
    this.exec(() => this.themeSettings.setLayoutNavbarFixed(fixed, updateStorage));
  }

  setLayoutFooterFixed(fixed: boolean, updateStorage = true): void {
    this.exec(() => this.themeSettings.setLayoutFooterFixed(fixed, updateStorage));
  }

  setLayoutReversed(reversed: boolean, updateStorage = true): void {
    this.exec(() => this.themeSettings.setLayoutReversed(reversed, updateStorage));
  }

  setNavbarBg(bg: string, updateStorage = true): void {
    this.exec(() => this.themeSettings.setNavbarBg(bg, updateStorage));
  }

  setSidenavBg(bg: string, updateStorage = true): void {
    this.exec(() => this.themeSettings.setSidenavBg(bg, updateStorage));
  }

  setFooterBg(bg: string, updateStorage = true): void {
    this.exec(() => this.themeSettings.setFooterBg(bg, updateStorage));
  }

  update(): void {
    this.exec(() => this.themeSettings.update());
  }

  updateNavbarBg(): void {
    this.exec(() => this.themeSettings.updateNavbarBg());
  }

  updateSidenavBg(): void {
    this.exec(() => this.themeSettings.updateSidenavBg());
  }

  updateFooterBg(): void {
    this.exec(() => this.themeSettings.updateFooterBg());
  }

  clearLocalStorage(): void {
    this.exec(() => this.themeSettings.clearLocalStorage());
  }

  destroy(): void {
    this.exec(() => this.themeSettings.destroy());
  }
}

export type ThemeSettingsStyle = 'light' | 'material' | 'dark';

export interface ThemeSettingsTheme {
  name: string;
  title: string;
  colors?: {
    primary: string;
    navbar: string;
    sidenav: string;
  };
  colorsDark?: {
    primary: string;
    navbar: string;
    sidenav: string;
  };
}

export interface ThemeSettingsOptions {
  cssPath: string;
  themesPath: string;
  cssFilenamePattern: string;
  navbarBgs: string[];
  defaultNavbarBg: string;
  sidenavBgs: string[];
  defaultSidenavBg: string;
  footerBgs: string[];
  defaultFooterBg: string;
  availableThemes: ThemeSettingsTheme[];
  defaultTheme: ThemeSettingsTheme;
  styles: ThemeSettingsStyle[];
  theme: ThemeSettingsTheme;
  controls: string[];
  rtl: boolean;
  material: boolean;
  layoutPosition: 'static' | 'static-offcanvas' | 'fixed' | 'fixed-offcanvas';
  layoutReversed: boolean;
  layoutNavbarFixed: boolean;
  layoutFooterFixed: boolean;
  navbarBg: string;
  sidenavBg: string;
  footerBg: string;
  pathResolver: (url: string) => string;
}
