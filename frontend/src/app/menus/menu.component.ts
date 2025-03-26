import { Component, HostListener, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { StakeholderResponse } from '../stakeholder/model/stakeholder-response';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {
  @Input() icon: string;
  @Input() actions: {name: string, icon: string, onClick: any}[] = [];
  @Input() returnAction: any;
  @Input() stakeholders: any;
  @Input() toggle: string;
  @Input() isStakeholdersCell:boolean;

  isToggled: boolean = false;
  stakeholderListToggled: boolean = false;
  colorListToggled:boolean = false;
  isFlippedUp: boolean = false;

  @ViewChild('dropdownMenu') dropdownMenuElement: ElementRef;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    // Initial check after the view is initialized
    setTimeout(() => this.checkPosition(), 0);
  }

  toggleMenu(component: string): void {
    if (component == "Menu"){
      if(this.stakeholderListToggled == true){
        this.isToggled = false;
        this.stakeholderListToggled = !this.stakeholderListToggled;
      }
      else{
        this.isToggled = !this.isToggled;
        if (this.isToggled) {
          // When opening the menu, check position
          setTimeout(() => this.checkPosition(), 0);
        }
      }
    }
    else if (component == "Stakeholders"){
      this.isToggled = false;
      this.stakeholderListToggled = !this.stakeholderListToggled;
      if (this.stakeholderListToggled) {
        // When opening the menu, check position
        setTimeout(() => this.checkPosition(), 0);
      }
    }
    else if (component == "Colors"){
      this.colorListToggled = !this.colorListToggled;
      if (this.colorListToggled) {
        // When opening the menu, check position
        setTimeout(() => this.checkPosition(), 0);
      }
    }
  }

  checkPosition(): void {
    // Check dropdown menu position
    if (this.isToggled && this.dropdownMenuElement) {
      const menuRect = this.dropdownMenuElement.nativeElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // If the dropdown would extend below the viewport
      if (menuRect.bottom > viewportHeight) {
        this.isFlippedUp = true;
      } else {
        this.isFlippedUp = false;
      }
    }

    // Check stakeholder list position
    if (this.stakeholderListToggled) {
      const stakeholderListElement = this.elementRef.nativeElement.querySelector('.stakeholder-list');
      if (stakeholderListElement) {
        const stakeholderRect = stakeholderListElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // If the stakeholder list would extend below the viewport
        if (stakeholderRect.bottom > viewportHeight) {
          this.isFlippedUp = true;
        } else {
          this.isFlippedUp = false;
        }
      }
    }

    // Check color list position
    if (this.colorListToggled) {
      const colorListElement = this.elementRef.nativeElement.querySelector('.color-menu');
      if (colorListElement) {
        const colorRect = colorListElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // If the color list would extend below the viewport
        if (colorRect.bottom > viewportHeight) {
          this.isFlippedUp = true;
        } else {
          this.isFlippedUp = false;
        }
      }
    }
  }

  stakeHolderAction():{onClick: any} {
    return {onClick: (stakeHolder: StakeholderResponse) => this.returnStakeHolder(stakeHolder)};
  }

  returnStakeHolder(stakeHolder: StakeholderResponse): void {
    this.returnAction(stakeHolder);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Clicked outside of the menu
      this.isToggled = false;
      this.stakeholderListToggled = false;
      this.colorListToggled = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    // Check position on window resize
    this.checkPosition();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Check position on scroll
    this.checkPosition();
  }

  stakeHolderCloseAction(): any {
    return {onClick: () => this.stakeholderListToggled = false};
  }
}