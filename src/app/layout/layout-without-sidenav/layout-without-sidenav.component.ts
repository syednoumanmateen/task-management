import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-layout-without-sidenav',
  templateUrl: './layout-without-sidenav.component.html',
  styles: [':host { display: block; }']
})
export class LayoutWithoutSidenavComponent implements AfterViewInit, OnDestroy {
  // Prevent "blink" effect
  public initialized = false;

  constructor(private layoutService: LayoutService,private router:Router) {}

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
