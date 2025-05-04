import {Component, HostListener, ViewChild, AfterViewInit, Input, ElementRef} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css']
})

export class BackToTopComponent implements AfterViewInit {
  @Input() viewport!: CdkVirtualScrollViewport;
  showButton = false;

  @ViewChild('liveAnnouncer', { static: false }) liveAnnouncer!: ElementRef;


  ngAfterViewInit(): void {
    if (this.viewport) {
      this.viewport.elementScrolled().subscribe(() => {
        const offset = this.viewport.measureScrollOffset('top');
        const wasVisible = this.showButton;
        this.showButton = offset > 200;
        if (!wasVisible && this.showButton && this.liveAnnouncer) {
          this.liveAnnouncer.nativeElement.textContent = 'Back to top button is now available';
        }
      });
    }
  }

  scrollToTop(): void {
    if (this.viewport) {
      this.viewport.scrollToIndex(0, 'smooth');
    }

    const focusTarget = document.querySelector('a, button, [tabindex="0"]') as HTMLElement;
    focusTarget?.focus();
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.scrollToTop();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'ArrowUp') {
      event.preventDefault();
      this.scrollToTop();
    }
  }

}
