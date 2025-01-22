import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { ValidationValue, ValidationValue2LabelMapping } from '../validation/model/validation-value';
import { TranslateService } from '@ngx-translate/core';
import { GlobalConstants } from '../constants/global-constants';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  validationValue2LabelMapping = ValidationValue2LabelMapping;
  validationValues = Object.values(ValidationValue);
  isToggled: boolean = false;

  @Input() selectedValue: ValidationValue; // Unique identifier for each instance
  @Output() selectionChange: EventEmitter<ValidationValue> = new EventEmitter<ValidationValue>();

  constructor(
    private elementRef: ElementRef,
    private translateService: TranslateService
  ) {}

  toggleSelect(): void {
    this.isToggled = !this.isToggled;
  }

  customSelectionValue(): string {
    if (!Object.keys(this.validationValue2LabelMapping).includes(this.selectedValue)){
      if (this.translateService.currentLang === GlobalConstants.ET) {
        return "Vali";
      }
      return "Select";
    }
    return 'select.' + this.validationValue2LabelMapping[this.selectedValue];
  }

  onValueChange(validationValue: ValidationValue): void {
    this.selectedValue = validationValue;
    this.selectionChange.emit(validationValue)
    this.toggleSelect();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Clicked outside of the menu
      this.isToggled = false;
    }
  }
}
