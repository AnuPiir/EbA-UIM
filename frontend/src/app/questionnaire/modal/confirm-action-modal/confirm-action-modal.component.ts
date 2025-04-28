import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.css']
})
export class ConfirmActionModalComponent {
  @Input() title!: string;
  @Input() message!: string;
  @Input() confirmButtonText = 'button.delete';
  @Input() cancelButtonText = 'button.cancel';

  onClose!: (result: boolean) => void;

  constructor(public bsModalRef: BsModalRef) {}

  close(result: boolean) {
    if (this.onClose) {
      this.onClose(result);
    }
    this.bsModalRef.hide();
  }
}
