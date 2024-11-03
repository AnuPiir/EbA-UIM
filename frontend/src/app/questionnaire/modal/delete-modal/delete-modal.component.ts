import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() isProject: boolean;
  @Input() isFeatureGroup: boolean;
  @Input() isStakeholder: boolean;

  questionnaireName: string = '';
  public onClose: Subject<{ deleteObject: boolean}>;

  constructor(private modalRef: BsModalRef) {}

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  close(deleteObject: boolean): void {
    this.onClose.next({deleteObject: deleteObject});
    this.modalRef.hide();
  }
}
