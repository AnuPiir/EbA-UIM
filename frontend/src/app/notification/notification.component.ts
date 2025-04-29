import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();

  @ViewChild('modalContainer') modalContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    if (this.show && this.modalContainer) {
      this.modalContainer.nativeElement.focus();
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    const focusableElements = this.modalContainer.nativeElement.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  closeNotification(): void {
    this.close.emit();
  }
}
