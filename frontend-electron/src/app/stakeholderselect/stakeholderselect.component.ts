import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { GlobalConstants } from '../constants/global-constants';

@Component({
  selector: 'app-stakeholderselect',
  templateUrl: './stakeholderselect.component.html',
  styleUrls: ['./stakeholderselect.component.css']
})
export class StakeholderselectComponent {
  @Input() stakeholders: {name: string, color: string}[] = [];
  @Input() action: {onClick: any};
  @Input() closeAction: {onClick: any};

  isToggled: boolean = true;
  isFirstClickIgnored: boolean = false;
  constructor(private elementRef: ElementRef) {}

  getStakeholderColorClass(i: number): string {
    let colorIndex = i % GlobalConstants.STAKEHOLDER_COLOR_ORDER.length;
    return GlobalConstants.STAKEHOLDER_COLOR_ORDER[colorIndex];
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (!this.isFirstClickIgnored) {
        //Required because when opening element also registers this click
        this.isFirstClickIgnored = true;

        return;
      }
      this.closeAction.onClick()
    }
  }
}
