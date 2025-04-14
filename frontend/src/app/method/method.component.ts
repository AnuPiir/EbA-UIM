import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})
export class MethodComponent implements AfterViewInit {
  @ViewChild('methodTabs') methodTabs: MatTabGroup;
  @ViewChild('featureGroupTabs') featureGroupTabs: MatTabGroup;
  @ViewChild('combinationsTabs') combinationsTabs: MatTabGroup;

  activeTabIndex: number = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.activeTabIndex = this.methodTabs ?.selectedIndex ?? 0;
    }, 500);
  }

  onTabChange(event: MatTabChangeEvent) {
    this.activeTabIndex = event.index;
  }
  }


