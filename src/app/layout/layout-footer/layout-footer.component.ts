import { Component, HostBinding } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styles: [':host { display: block; }']
})
export class LayoutFooterComponent {
  @HostBinding('class.layout-footer') hostClassMain = true;

  constructor(private appService: AppService) {}

  currentBg(): string {
    return `bg-${this.appService.layoutFooterBg}`;
  }
}
