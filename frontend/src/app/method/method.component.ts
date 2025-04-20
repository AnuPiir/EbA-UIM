import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})
export class MethodComponent {
  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    const tabGroups: NodeListOf<HTMLElement> =
        this.el.nativeElement.querySelectorAll('mat-tab-group');

    tabGroups.forEach(group => {
      group.addEventListener(
          'keydown',
          (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
              event.stopImmediatePropagation();
            }
          },
          true
      );
    });
  }
}
