import { Component, Input, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-examplemenu',
  templateUrl: './examplemenu.component.html',
  styleUrls: ['./examplemenu.component.css']
})
export class ExamplemenuComponent {

  @Input() actions: { name: string, icon: string, onClick: () => void }[] = [];
  @Input() onAddExample: () => void;
  @Input() onDeleteExample: () => void;
  @Input() onNoExample: () => void;

  isOpen = false;
  focusedIndex = 0;

  @ViewChildren('menuItem') menuItems!: QueryList<ElementRef<HTMLElement>>;

  constructor(private el: ElementRef) {}

  toggleMenu(): void {
    this.isOpen = !this.isOpen;

    setTimeout(() => {
      if (this.isOpen && this.menuItems && this.menuItems.length > 0) {
        this.focusedIndex = 0;
        this.focusItem(this.focusedIndex);
      }
    }, 0);
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
    if (event.key === 'Escape') {
      this.closeMenu();
    }
    if (event.key === 'Tab') {
      this.closeMenu();
    }
  }

  focusItem(index: number): void {
    const item = this.menuItems.get(index);
    if (item) {
      item.nativeElement.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  handleAddExample(): void {
    this.onAddExample();
    this.closeMenu();
  }

  handleDeleteExample(): void {
    this.onDeleteExample();
    this.closeMenu();
  }

  handleNoExample(): void {
    this.onNoExample();
    this.closeMenu();
  }


}
