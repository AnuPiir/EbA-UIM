import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit{
  @Input() name: string;
  @Input() titleTranslationKey: string;
  @Input() inputTranslationKey: string;

  public onClose: Subject<{edit: boolean, newValue: string}>;

  constructor(private modalRef: BsModalRef) {}

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  close(): void {
    this.onClose.next({edit: false, newValue: 'null'});
    this.modalRef.hide();
  }

  closeAndEdit(): void {
    this.onClose.next({edit: true, newValue: this.name});
    this.modalRef.hide();
  }
}
