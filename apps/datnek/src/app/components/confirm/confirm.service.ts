import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from './confirm.component';


@Injectable()
export class ConfirmService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'Supprimer le groupe',
    btnCancelText: string = 'Annuler',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

}
