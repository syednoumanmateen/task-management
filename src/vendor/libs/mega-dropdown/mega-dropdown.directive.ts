import { Directive, ElementRef, Input, OnDestroy, AfterViewInit, NgZone } from '@angular/core';

const MegaDropdown = require('./mega-dropdown.js').MegaDropdown;

@Directive({
  selector: '[megaDropdown]', // tslint:disable-line
  exportAs: 'megaDropdown'
})
export class MegaDropdownDirective implements OnDestroy, AfterViewInit {
  public megaDropdown: any;

  @Input() trigger = 'click';

  constructor(private el: ElementRef | null, private zone: NgZone) {
    this.el?.nativeElement.classList.add('mega-dropdown');
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.megaDropdown = new MegaDropdown(
        this.el?.nativeElement.querySelector('.dropdown-toggle'),
        { trigger: this.trigger }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.megaDropdown) {
      this.zone.runOutsideAngular(() => this.megaDropdown.destroy());
    }
    this.megaDropdown = null;
    this.el = null;
  }
}
