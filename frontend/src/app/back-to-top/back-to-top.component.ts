import {Component, HostListener, ViewChild, AfterViewInit, Input, ElementRef} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css']
})

export class BackToTopComponent implements AfterViewInit {
  @Input() viewport?: CdkVirtualScrollViewport;
  showButton = false;
  ctrlPressTimeout: any = null;
  ctrlPressed = false;

  @ViewChild('liveAnnouncer', { static: false }) liveAnnouncer!: ElementRef;

  private onScroll(): void {
    const offset = this.viewport
        ? this.viewport.measureScrollOffset('top')
        : window.scrollY || document.documentElement.scrollTop;

    this.updateButtonVisibility(offset);
  }

  private onScrollBound = () => this.onScroll();

  ngAfterViewInit(): void {
    if (this.viewport?.elementRef?.nativeElement) {
      this.viewport.elementRef.nativeElement.addEventListener('scroll', this.onScrollBound);
    } else {
      window.addEventListener('scroll', this.onScrollBound);
    }
  }

  ngOnDestroy(): void {
    if (this.viewport?.elementRef?.nativeElement) {
      this.viewport.elementRef.nativeElement.removeEventListener('scroll', this.onScrollBound);
    } else {
      window.removeEventListener('scroll', this.onScrollBound);
    }
  }

  private updateButtonVisibility(offset: number) {
    const wasVisible = this.showButton;
    this.showButton = offset > 200;
    if (!wasVisible && this.showButton && this.liveAnnouncer) {
      this.liveAnnouncer.nativeElement.textContent =
          'Back to top button is now available'; //muuta
    }
  }

  scrollToTop(): void {
    if (this.viewport) {
      this.viewport.scrollToIndex(0);
    } else {
      window.scrollTo({ top: 0 });
    }
    const focusTarget = document.querySelector('a, button, [tabindex="1"]') as HTMLElement;
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
    if (event.key === 'Control') {
      this.ctrlPressed = true;
      clearTimeout(this.ctrlPressTimeout);
      this.ctrlPressTimeout = setTimeout(() => {
        this.ctrlPressed = false;
      }, 3000);
    }

    if (event.key === 'ArrowUp' && this.ctrlPressed) {
      event.preventDefault();
      this.scrollToTop();
      this.ctrlPressed = false;
      clearTimeout(this.ctrlPressTimeout);
    }
  }

}
