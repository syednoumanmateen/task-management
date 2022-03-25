import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class AppService {
  constructor(private titleService: Title) {}

  // Set page title
  set pageTitle(value: string) {
    this.titleService.setTitle(`${value} - Angular Starter`);
  }

  // Check for RTL layout
  get isRTL(): boolean {
    return document.documentElement.getAttribute('dir') === 'rtl' ||
      document.body.getAttribute('dir') === 'rtl';
  }

  // Check if IE10
  get isIE10(): boolean {
    return (document as any).documentMode === 10;
  }

  // Layout navbar color
  get layoutNavbarBg(): string {
    return 'navbar-theme';
  }

  // Layout sidenav color
  get layoutSidenavBg(): string {
    return 'sidenav-theme';
  }

  // Layout footer color
  get layoutFooterBg(): string {
    return 'footer-theme';
  }

  // Animate scrollTop
  scrollTop(to: number, duration: number, element = document.scrollingElement || document.documentElement): void {
    if (element.scrollTop === to) { return; }
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();

    // t = current time; b = start value; c = change in value; d = duration
    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) { return c / 2 * t * t + b; }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animateScroll = () => {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };

    animateScroll();
  }
}
