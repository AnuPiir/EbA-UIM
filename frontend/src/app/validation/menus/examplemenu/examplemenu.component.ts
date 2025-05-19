import { Component, Input, ElementRef, HostListener, QueryList, ViewChildren, ViewChild } from '@angular/core';

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
  @ViewChild('toggleBtn', { static: true })
  toggleBtn!: ElementRef<HTMLButtonElement>;

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

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedIndex = (this.focusedIndex + 1) % this.menuItems.length;
        this.focusItem(this.focusedIndex);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedIndex = (this.focusedIndex - 1 + this.menuItems.length) % this.menuItems.length;
        this.focusItem(this.focusedIndex);
        break;
      case 'Escape':
        this.closeMenu();
        this.toggleBtn.nativeElement.focus();
        event.preventDefault();
        break;
      case 'Tab':
        this.closeMenu();
        break;
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
