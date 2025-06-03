import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private sanitizer: DomSanitizer) {}

  formatTextWithLineBreaks(text: string): SafeHtml {
    if (!text) return '';
    const formattedText = text.replace(/\n/g, '<br>');
    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }
}
