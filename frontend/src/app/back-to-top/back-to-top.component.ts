import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css']
})

export class BackToTopComponent {
  showButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 200;
  }

  scrollToTop() {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);

    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 10);

    const firstElement = document.querySelector('a, button, input, select, textarea') as HTMLElement;
    firstElement?.focus();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'ArrowUp') {
      event.preventDefault();
      this.scrollToTop();
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.scrollToTop();
    }
  }
}
