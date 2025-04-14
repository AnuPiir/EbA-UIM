import { Component, Input } from '@angular/core';
import { PdfService } from '../../utils/pdf.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-pdf-download-button',
    template: `
    <button class="download-pdf-button" (click)="downloadPdf()">
      <span class="material-symbols-outlined">download</span>
      {{ buttonText | translate }}
    </button>
  `,
    styles: [`
    .download-pdf-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: var(--light-blue);
      color: var(--dark-blue);
      border: solid;
      border-width: 0.125rem;
      border-radius: 0.5rem;
      border-color: var(--dark-blue);
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.2s;
      height: 2.5rem;
    }
    
    .download-pdf-button:hover {
      background-color: var(--blue);
    }
    
    .material-symbols-outlined {
      font-size: 1.25rem;
    }
  `]
})
export class PdfDownloadButtonComponent {
    @Input() tabGroup: any;
    @Input() fileName: string = 'document.pdf';
    @Input() title: string = 'Document';
    @Input() buttonText: string = 'pdfDownload.downloadPdf';

    constructor(
        private pdfService: PdfService,
        private translateService: TranslateService
    ) {}

    async downloadPdf(): Promise<void> {
        if (!this.tabGroup) {
            console.error('No tab group provided');
            return;
        }

        const translatedTitle = this.title.includes('.')
            ? this.translateService.instant(this.title)
            : this.title;

        try {
            if (this.fileName.toLowerCase().includes('combination')) {
                await this.pdfService.generateCombinationsPdf(this.fileName)
            } else {
                await this.pdfService.generatePdfFromTabGroup(
                    this.tabGroup,
                    this.fileName,
                    translatedTitle,
                    { scale: 2, width: 800, margin: 10 }
                );
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }
}