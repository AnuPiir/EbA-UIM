import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

    transform(
        value: string,
        limit: number = 25,
        completeWords: boolean = false,
        ellipsis: string = '...'
    ): string {
        if (!value) return '';
        if (value.length <= limit) return value;

        if (completeWords) {
            limit = value.substring(0, limit).lastIndexOf(' ');
        }

        return `${value.substring(0, limit)}${ellipsis}`;
    }
}