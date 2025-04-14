import { Injectable } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
    providedIn: 'root'
})
export class PdfService {
    constructor() {}

    async generateCombinationsPdf(fileName: string): Promise<void> {
        try {
            const contentElement = document.querySelector('.mat-mdc-tab-body-active .content') as HTMLElement;

            if (!contentElement) {
                console.error('Combinations content element not found');
                return;
            }

            const pdf = new jsPDF('p', 'mm', 'a4');

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;
            const contentWidth = pageWidth - (2 * margin);

            const tableElement = contentElement.querySelector('app-combination-view') as HTMLElement;
            if (tableElement) {
                tableElement.style.display = 'none';
            }

            const contentCanvas = await html2canvas(contentElement, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false
            });

            const contentImgWidth = contentWidth;
            const contentImgHeight = (contentCanvas.height * contentImgWidth) / contentCanvas.width;

            pdf.addImage(
                contentCanvas.toDataURL('image/jpeg', 0.95),
                'JPEG',
                margin,
                margin,
                contentImgWidth,
                contentImgHeight
            );

            if (tableElement) {
                tableElement.style.display = ''

                pdf.addPage();

                const table = document.querySelector('app-combination-view table') as HTMLElement;

                if (table) {

                    const rows = table.querySelectorAll('tr');
                    const ROWS_PER_PAGE = 30;

                    const headerRow = table.querySelector('thead tr');
                    let headerHtml = '';

                    if (headerRow) {
                        headerHtml = '<thead>' + headerRow.outerHTML + '</thead>';
                    }

                    let currentPage = 1;

                    for (let i = 0; i < rows.length; i += ROWS_PER_PAGE) {
                        if (i > 0) {
                            pdf.addPage();
                            currentPage++;
                        }

                        const tempTable = document.createElement('table');
                        tempTable.style.width = '100%';
                        tempTable.style.borderCollapse = 'collapse';
                        tempTable.style.fontSize = '9px';

                        if (headerHtml) {
                            tempTable.innerHTML = headerHtml;
                        }


                        tempTable.innerHTML += '<tbody>';


                        const end = Math.min(i + ROWS_PER_PAGE, rows.length);
                        for (let j = i; j < end; j++) {
                            if (rows[j].parentElement?.tagName.toLowerCase() !== 'thead') {
                                tempTable.innerHTML += rows[j].outerHTML;
                            }
                        }

                        tempTable.innerHTML += '</tbody>';

                        document.body.appendChild(tempTable);

                        const tableCanvas = await html2canvas(tempTable, {
                            scale: 1.5,
                            useCORS: true,
                            allowTaint: true
                        });


                        document.body.removeChild(tempTable);


                        const tableImgWidth = contentWidth;
                        const tableImgHeight = Math.min(
                            (tableCanvas.height * tableImgWidth) / tableCanvas.width,
                            pageHeight - 2 * margin
                        );

                        pdf.addImage(
                            tableCanvas.toDataURL('image/jpeg', 0.9),
                            'JPEG',
                            margin,
                            margin,
                            tableImgWidth,
                            tableImgHeight
                        );

                        pdf.setFontSize(10);
                        pdf.text(`Page ${currentPage}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
                    }
                }
            }


            if (!fileName.endsWith('.pdf')) fileName += '.pdf';
            pdf.save(fileName);

        } catch (error) {
            console.error('Error generating combinations PDF:', error);
        }
    }

    async generatePdfFromElements(
        elements: HTMLElement[],
        fileName: string,
        options: { scale?: number; width?: number; margin?: number } = {}
    ): Promise<void> {
        if (!elements || elements.length === 0) {
            throw new Error('No elements to export');
        }

        const pdf = new jsPDF('p', 'mm', 'a4');
        const scale = options.scale || 2;
        const margin = options.margin || 10;

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const contentWidth = pageWidth - 2 * margin;
        const contentHeight = pageHeight - 2 * margin;

        const renderWidth = options.width || Math.max(...elements.map(el => el.scrollWidth || 600));

        let isFirstPage = true;
        let position = margin;

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const clonedElement = element.cloneNode(true) as HTMLElement;
            document.body.appendChild(clonedElement);

            try {
                this.prepareElementForCapture(clonedElement, renderWidth);
                await this.waitForImages(clonedElement);

                const tables = clonedElement.querySelectorAll('table');
                let hasTables = tables.length > 0;

                if (hasTables) {
                    for (const table of Array.from(tables)) {
                        // @ts-ignore
                        const result = await this.processTableForPdf(
                            table as HTMLElement,
                            pdf,
                            contentWidth,
                            contentHeight,
                            margin,
                            scale,
                            isFirstPage
                        );
                        isFirstPage = result.isFirstPage;
                        position = result.position;
                    }
                } else {
                    const elementWidth = clonedElement.scrollWidth;
                    const elementHeight = clonedElement.scrollHeight;

                    const canvas = await html2canvas(clonedElement, {
                        scale: scale,
                        useCORS: true,
                        allowTaint: true,
                        logging: false,
                        width: elementWidth,
                        height: elementHeight
                    });

                    const imgWidth = contentWidth;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;

                    let heightLeft = imgHeight;
                    let sourceY = 0;

                    if (!isFirstPage) {
                        pdf.addPage();
                        position = margin;
                    } else {
                        isFirstPage = false;
                    }

                    while (heightLeft > 0) {
                        if (position + Math.min(contentHeight, heightLeft) > pageHeight - margin) {
                            pdf.addPage();
                            position = margin;
                        }

                        const currentHeight = Math.min(contentHeight - (position - margin), heightLeft);
                        const tempCanvas = document.createElement('canvas');
                        tempCanvas.width = canvas.width;
                        tempCanvas.height = (currentHeight * canvas.width) / imgWidth;

                        const ctx = tempCanvas.getContext('2d');
                        if (ctx) {
                            ctx.drawImage(
                                canvas,
                                0,
                                sourceY * (canvas.width / imgWidth),
                                canvas.width,
                                tempCanvas.height,
                                0,
                                0,
                                canvas.width,
                                tempCanvas.height
                            );
                        }

                        pdf.addImage(
                            tempCanvas,
                            'JPEG',
                            margin,
                            position,
                            imgWidth,
                            currentHeight,
                            undefined,
                            'FAST'
                        );

                        heightLeft -= currentHeight;
                        sourceY += currentHeight;
                        position += currentHeight + 5;

                        if (heightLeft > 0) {
                            pdf.addPage();
                            position = margin;
                        }
                    }
                }
            } catch (error) {
                console.error(`Error rendering element ${i}:`, error);
            } finally {
                document.body.removeChild(clonedElement);
            }
        }

        if (!fileName.endsWith('.pdf')) fileName += '.pdf';
        pdf.save(fileName);
    }

    async generatePdfFromTabGroup(
        tabGroup: MatTabGroup,
        fileName: string,
        title: string,
        options: { scale?: number; width?: number; margin?: number } = {}
    ): Promise<void> {
        if (!tabGroup) {
            throw new Error('No tab group provided');
        }

        const tabs = tabGroup._tabs?.toArray();
        if (!tabs || tabs.length === 0) {
            throw new Error('No tabs found in the tab group');
        }

        const currentIndex = tabGroup.selectedIndex || 0;
        const tabContents: HTMLElement[] = [];

        const docWidth = document.documentElement.clientWidth || 800;
        options.width = options.width || Math.min(docWidth, 1200);

        for (let i = 0; i < tabs.length; i++) {
            tabGroup.selectedIndex = i;
            await new Promise(resolve => setTimeout(resolve, 300));

            const selectors = [
                '.mat-mdc-tab-body-active .content',
                '.mat-mdc-tab-body-active > div',
                '.mat-tab-body-active .content',
                '.mat-tab-body-active > div'
            ];

            let tabContent = null;
            for (const selector of selectors) {
                tabContent = document.querySelector(selector);
                if (tabContent) break;
            }

            if (tabContent) {
                const wrapper = document.createElement('div');
                wrapper.style.padding = '20px';
                wrapper.style.backgroundColor = '#ffffff';
                wrapper.style.width = `${options.width}px`;

                const heading = document.createElement('h2');
                heading.textContent = title || tabs[i].textLabel || `Tab ${i + 1}`;
                heading.style.marginBottom = '15px';
                wrapper.appendChild(heading);

                const contentClone = tabContent.cloneNode(true) as HTMLElement;
                wrapper.appendChild(contentClone);

                tabContents.push(wrapper);
            } else {
                console.warn(`Content not found for tab ${i}`);
            }
        }

        tabGroup.selectedIndex = currentIndex;

        if (tabContents.length === 0) {
            throw new Error('No tab content found to generate PDF');
        }

        await this.generatePdfFromElements(tabContents, fileName, options);
    }

    private async waitForImages(element: HTMLElement): Promise<void> {
        const images = Array.from(element.querySelectorAll('img'));
        await Promise.all(
            images.map(
                img =>
                    new Promise<void>(resolve => {
                        img.crossOrigin = 'Anonymous';
                        img.style.maxWidth = '100%';
                        if (img.complete) {
                            resolve();
                        } else {
                            img.onload = () => resolve();
                            img.onerror = () => {
                                console.warn('Failed to load image:', img.src);
                                resolve();
                            };
                            setTimeout(resolve, 2000);
                        }
                    })
            )
        );
    }

    private prepareElementForCapture(element: HTMLElement, width: number): void {
        element.style.display = 'block';
        element.style.width = `${width}px`;
        element.style.position = 'absolute';
        element.style.top = '-9999px';
        element.style.left = '-9999px';
        element.style.backgroundColor = '#ffffff';
        element.style.padding = '20px';
        element.style.boxSizing = 'border-box';
        element.style.overflow = 'visible';

        const images = element.querySelectorAll('img');
        images.forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });

        const tables = element.querySelectorAll('table') as NodeListOf<HTMLTableElement>;
        tables.forEach(table => {
            table.style.width = '100%';
            table.style.tableLayout = 'fixed';
            table.style.borderCollapse = 'collapse';

            const cells = table.querySelectorAll('td, th') as NodeListOf<HTMLTableCellElement>;
            cells.forEach(cell => {
                cell.style.wordBreak = 'break-word';
                cell.style.overflow = 'hidden';
                cell.style.maxWidth = '100%';
            });
        });
    }

    private async processTableForPdf(
        tableElement: HTMLElement,
        pdf: jsPDF,
        contentWidth: number,
        contentHeight: number,
        margin: number,
        scale: number,
        isFirstPage: boolean = true
    ): Promise<{ isFirstPage: boolean; position: number }> {
        const originalTable = tableElement as HTMLTableElement;
        const rows = originalTable.rows;

        if (!rows || rows.length === 0) {
            return { isFirstPage, position: margin };
        }

        if (!isFirstPage) {
            pdf.addPage();
        } else {
            isFirstPage = false;
        }

        let position = margin;

        if (rows[0]) {
            const headerRow = rows[0];
            const headerTable = document.createElement('table');
            headerTable.style.width = '100%';
            headerTable.style.tableLayout = 'fixed';
            headerTable.appendChild(headerRow.cloneNode(true));

            document.body.appendChild(headerTable);

            const tableWidth = originalTable.offsetWidth ||
                tableElement.scrollWidth ||
                tableElement.clientWidth ||
                600;

            this.prepareElementForCapture(headerTable, tableWidth);

            const headerCanvas = await html2canvas(headerTable, {
                scale,
                useCORS: true,
                allowTaint: true,
                logging: false,
                width: tableWidth
            });

            document.body.removeChild(headerTable);

            const headerImgWidth = contentWidth;
            const headerImgHeight = (headerCanvas.height * headerImgWidth) / headerCanvas.width;

            pdf.addImage(
                headerCanvas,
                'JPEG',
                margin,
                position,
                headerImgWidth,
                headerImgHeight,
                undefined,
                'FAST'
            );

            position += headerImgHeight + 5;

            const CHUNK_SIZE = 20;

            for (let i = 1; i < rows.length; i += CHUNK_SIZE) {
                const chunkTable = document.createElement('table');
                chunkTable.style.width = '100%';
                chunkTable.style.tableLayout = 'fixed';

                const endIndex = Math.min(i + CHUNK_SIZE, rows.length);
                for (let j = i; j < endIndex; j++) {
                    chunkTable.appendChild(rows[j].cloneNode(true));
                }

                document.body.appendChild(chunkTable);
                this.prepareElementForCapture(chunkTable, tableWidth);

                const chunkCanvas = await html2canvas(chunkTable, {
                    scale,
                    useCORS: true,
                    allowTaint: true,
                    logging: false,
                    width: tableWidth
                });

                document.body.removeChild(chunkTable);

                const chunkImgWidth = contentWidth;
                const chunkImgHeight = (chunkCanvas.height * chunkImgWidth) / chunkCanvas.width;

                if (position + chunkImgHeight > contentHeight + margin) {
                    pdf.addPage();
                    position = margin;

                    pdf.addImage(
                        headerCanvas,
                        'JPEG',
                        margin,
                        position,
                        headerImgWidth,
                        headerImgHeight,
                        undefined,
                        'FAST'
                    );

                    position += headerImgHeight + 5;
                }

                pdf.addImage(
                    chunkCanvas,
                    'JPEG',
                    margin,
                    position,
                    chunkImgWidth,
                    chunkImgHeight,
                    undefined,
                    'FAST'
                );

                position += chunkImgHeight + 5;
            }
        }

        return { isFirstPage, position };
    }
}