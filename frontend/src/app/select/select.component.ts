import {Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { ValidationValue, ValidationValue2LabelMapping } from '../validation/model/validation-value';
import { TranslateService } from '@ngx-translate/core';
import { GlobalConstants } from '../constants/global-constants';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements AfterViewInit {
  validationValue2LabelMapping = ValidationValue2LabelMapping;
  validationValues = Object.values(ValidationValue);
  isToggled: boolean = false;
  isFlippedUp: boolean = false;

  @ViewChild('optionContainer') optionContainer: ElementRef;
  @Input() selectedValue: ValidationValue;
  @Output() selectionChange: EventEmitter<ValidationValue> = new EventEmitter<ValidationValue>();

  constructor(
      private elementRef: ElementRef,
      private translateService: TranslateService
  ) {}

  ngAfterViewInit(): void {
    // Initial position check
    setTimeout(() => {
      this.checkPosition();
    }, 0);
  }

  toggleSelect(): void {
    this.isToggled = !this.isToggled;
    if (this.isToggled) {
      // When opening the dropdown, check position
      setTimeout(() => this.checkPosition(), 0);
    }
  }

  checkPosition(): void {
    if (!this.isToggled || !this.optionContainer) return;

    const buttonRect = this.elementRef.nativeElement.querySelector('.select-button').getBoundingClientRect();
    const optionsContainer = this.optionContainer.nativeElement;
    const optionsHeight = optionsContainer.scrollHeight;
    const viewportHeight = window.innerHeight;
    const bottomSpace = viewportHeight - buttonRect.bottom;

    // If there's not enough space below, and more space above, flip up
    if (bottomSpace < optionsHeight && buttonRect.top > optionsHeight) {
      this.isFlippedUp = true;
    } else {
      this.isFlippedUp = false;
    }

    // Force a layout recalculation
    optionsContainer.style.visibility = 'hidden';
    setTimeout(() => {
      optionsContainer.style.visibility = 'visible';
    }, 0);
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

  @HostListener('window:resize', ['$event'])
  onResize() {
    // Check position on window resize
    this.checkPosition();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Check position on scroll
    this.checkPosition();
  }
}