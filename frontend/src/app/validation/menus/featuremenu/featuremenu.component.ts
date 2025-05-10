import { Component, Input, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-featuremenu',
  templateUrl: './featuremenu.component.html',
  styleUrls: ['./featuremenu.component.css']
})
export class FeaturemenuComponent {

  @Input() onDeleteFeature: () => void;

  isOpen = false;
  focusedIndex = 0;
  @ViewChildren('menuItem') menuItems!: QueryList<ElementRef<HTMLElement>>;

  constructor(private el: ElementRef) {}

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
    setTimeout(() => {
      if (this.isOpen && this.menuItems.length > 0) {
        this.focusedIndex = 0;
        this.focusItem(this.focusedIndex);
      }
    });
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusedIndex = (this.focusedIndex + 1) % this.menuItems.length;
      this.focusItem(this.focusedIndex);
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusedIndex = (this.focusedIndex - 1 + this.menuItems.length) % this.menuItems.length;
      this.focusItem(this.focusedIndex);
    }
    if (event.key === 'Escape' || event.key === 'Tab') {
      this.closeMenu();
    }
  }

  focusItem(index: number): void {
    this.menuItems.get(index)?.nativeElement.focus();
  }

  handleDeleteFeature(): void {
    this.onDeleteFeature();
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}
