import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-layout-horizontal-sidenav',
  templateUrl: './layout-horizontal-sidenav.component.html',
  styles: [':host { display: block; }', ':host ::ng-deep .layout-loading .sidenav-link { transition: none !important; }']
})
export class LayoutHorizontalSidenavComponent implements AfterViewInit, OnDestroy {
  // Prevent "blink" effect
  public initialized = false;

  constructor(private layoutService: LayoutService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initialized = true;

      // Enshure that we have not '.layout-expanded' class on the html element
      this.layoutService._removeClass('layout-expanded');

      this.layoutService.init();
      this.layoutService.update();
      this.layoutService.setAutoUpdate(true);
    });
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.layoutService.destroy();
    });
  }
}
