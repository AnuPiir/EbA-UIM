import {Component, Input} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.css']
})
export class AccessibilityComponent {
  @Input() isPanelOpen: boolean = false;

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  toggleColorScheme() {
    // You can call the method from your app.component.ts to toggle the color scheme
    // Assuming the method exists in a shared service or directly in app component
  }

  changeTextSize(event: any) {
    const textSize = event.target.value;
    document.documentElement.style.fontSize = textSize === 'small' ? '12px' :
        textSize === 'medium' ? '16px' : '20px';
  }
}
